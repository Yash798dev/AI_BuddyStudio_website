import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit,HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


interface FAQ {
  question: string;
  answer: string;
  isOpen: boolean;
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  // FAQ Data
  faqList: FAQ[] = [
    {
      question: 'When is the workshop?',
      answer: 'The AI Tools & ChatGPT workshop is scheduled for September 9, 2025, starting at 7:00 PM onwards. It will be a live, interactive session lasting 3+ hours.',
      isOpen: false
    },
    {
      question: 'Will this be live?',
      answer: 'Yes, this will be a completely live workshop. You will be able to interact with the instructors, ask questions in real-time, and participate in live demonstrations of AI tools.',
      isOpen: false
    },
    {
      question: 'Is it a certified workshop?',
      answer: 'Yes, you will receive an official certification from Be10X upon completion of the workshop. This certificate will highlight your AI tool capabilities and can be added to your resume and LinkedIn profile.',
      isOpen: false
    },
    {
      question: 'Will it be recorded?',
      answer: 'No, the workshop will not be recorded. This ensures exclusivity for attendees and encourages active participation during the live session. Make sure to attend the scheduled time.',
      isOpen: false
    },
    {
      question: 'What should I be prepared with before the workshop starts?',
      answer: 'Come prepared with a notebook and pen to take notes during the workshop. Ensure you have a stable internet connection and a quiet environment for the 3-hour session. No prior technical knowledge is required.',
      isOpen: false
    },
    {
      question: 'I made the payment but didn\'t receive any email',
      answer: 'If you haven\'t received a confirmation email after payment, please check your spam/junk folder first. If you still don\'t find it, contact our support team with your payment details, and we\'ll resolve this immediately.',
      isOpen: false
    }
  ];

  constructor(private router:Router) {}

  ngOnInit(): void {
    // Initialize component
  }

  // Toggle FAQ function
  toggleFaq(index: number): void {
    // Close all other FAQs first (accordion behavior)
    this.faqList.forEach((faq, i) => {
      if (i !== index) {
        faq.isOpen = false;
      }
    });

    // Toggle the clicked FAQ
    this.faqList[index].isOpen = !this.faqList[index].isOpen;

    // Track FAQ interaction
    this.trackEvent('faq_toggle', {
      question_index: index,
      question: this.faqList[index].question,
      is_opened: this.faqList[index].isOpen
    });
  }

  // Registration method
  registerForWorkshop(): void {
    console.log('Workshop registration initiated from FAQ section');

    this.trackEvent('registration_attempt', {
      source: 'faq_section',
      timestamp: new Date().toISOString()
    });

    // Implement your registration logic here
    // Example options:

    // Option 1: Navigate to registration page
    // this.router.navigate(['/register']);

    // Option 2: Open registration modal
    // this.openRegistrationModal();

    // Option 3: Redirect to external payment gateway
    // window.open('https://payments.razorpay.com/pl_xyz', '_blank');

    // For demo purposes
    alert('🚀 AI Tools Workshop Registration\n\n' +
          '📅 Date: September 9, 2025\n' +
          '🕒 Time: 7:00 PM Onwards\n' +
          '💰 Price: Just ₹9 (Originally ₹929)\n' +
          '🎁 Bonuses Worth: ₹10,500\n\n' +
          'Redirecting to secure payment gateway...');
  }

  // Social media navigation
  navigateToSocial(platform: string): void {
    const socialUrls = {
      facebook: 'https://facebook.com/be10x',
      instagram: 'https://instagram.com/be10x',
      twitter: 'https://twitter.com/be10x',
      linkedin: 'https://linkedin.com/company/be10x',
      youtube: 'https://youtube.com/be10x'
    };

    const url = socialUrls[platform as keyof typeof socialUrls];
    if (url) {
      window.open(url, '_blank');
      this.trackEvent('social_media_click', { platform });
    }
  }

  // Footer link navigation
  navigateToFooterLink(linkType: string): void {
    console.log(`Navigating to: ${linkType}`);

    this.trackEvent('footer_link_click', { link_type: linkType });

    // Implement navigation logic based on linkType
    switch (linkType) {
      case 'about':
        // this.router.navigate(['/about']);
        break;
      case 'contact':
        // this.router.navigate(['/contact']);
        break;
      case 'teach':
        // this.router.navigate(['/teach-with-us']);
        break;
      case 'cancellation':
        // this.router.navigate(['/cancellation-policy']);
        break;
      case 'privacy':
        // this.router.navigate(['/privacy-policy']);
        break;
      case 'terms':
        // this.router.navigate(['/terms-of-use']);
        break;
      case 'guest-posting':
        // this.router.navigate(['/guest-posting']);
        break;
      default:
        console.log('Unknown link type:', linkType);
    }
  }

  // Event tracking
  private trackEvent(eventName: string, eventData?: any): void {
    console.log(`Event tracked: ${eventName}`, eventData);

    // Implement your analytics tracking here
    // Examples:

    // Google Analytics 4
    // gtag('event', eventName, {
    //   event_category: 'user_interaction',
    //   event_label: 'faq_footer_section',
    //   custom_parameters: eventData
    // });

    // Facebook Pixel
    // fbq('track', eventName, eventData);

    // Custom Analytics Service
    // this.analyticsService.track(eventName, eventData);
  }

  // Get FAQ by question text (utility method)
  getFaqByQuestion(questionText: string): FAQ | undefined {
    return this.faqList.find(faq =>
      faq.question.toLowerCase().includes(questionText.toLowerCase())
    );
  }

  // Open all FAQs (utility method)
  openAllFaqs(): void {
    this.faqList.forEach(faq => faq.isOpen = true);
    this.trackEvent('faq_expand_all');
  }

  // Close all FAQs (utility method)
  closeAllFaqs(): void {
    this.faqList.forEach(faq => faq.isOpen = false);
    this.trackEvent('faq_collapse_all');
  }

  // Search FAQs (utility method)
  searchFaqs(searchTerm: string): FAQ[] {
    if (!searchTerm.trim()) {
      return this.faqList;
    }

    const filtered = this.faqList.filter(faq =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    this.trackEvent('faq_search', { search_term: searchTerm, results_count: filtered.length });

    return filtered;
  }

  // Add new FAQ (admin utility)
  addFaq(question: string, answer: string): void {
    const newFaq: FAQ = {
      question,
      answer,
      isOpen: false
    };

    this.faqList.push(newFaq);
    this.trackEvent('faq_added', { question });
  }

  // Remove FAQ (admin utility)
  removeFaq(index: number): void {
    if (index >= 0 && index < this.faqList.length) {
      const removedFaq = this.faqList.splice(index, 1)[0];
      this.trackEvent('faq_removed', { question: removedFaq.question });
    }
  }

  // Contact support
  contactSupport(): void {
    const supportEmail = 'support@be10x.com';
    const subject = 'AI Tools Workshop - Support Request';
    const body = 'Hi Be10X Team,\n\nI need assistance with the AI Tools Workshop.\n\nPlease help me with:\n\n\nThank you!';

    const mailtoLink = `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;

    this.trackEvent('support_contact', { method: 'email' });
  }

  // Share workshop
  shareWorkshop(platform: string): void {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('🚀 Join the AI Tools & ChatGPT Workshop! Learn to become a highly paid prompt engineer. Just ₹9!');

    let shareUrl = '';

    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${text} ${url}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
      this.trackEvent('workshop_share', { platform });
    }
  }

  // Get registration deadline
  getRegistrationDeadline(): Date {
    return new Date('2025-09-08T23:59:59'); // September 08, 2025 midnight
  }

  // Check if registration is still open
  isRegistrationOpen(): boolean {
    const now = new Date();
    const deadline = this.getRegistrationDeadline();
    return now.getTime() < deadline.getTime();
  }

  // Get time remaining until deadline
  getTimeUntilDeadline(): string {
    const now = new Date();
    const deadline = this.getRegistrationDeadline();
    const timeDiff = deadline.getTime() - now.getTime();

    if (timeDiff <= 0) {
      return 'Registration closed';
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) {
      return `${days} days, ${hours} hours remaining`;
    } else if (hours > 0) {
      return `${hours} hours, ${minutes} minutes remaining`;
    } else {
      return `${minutes} minutes remaining`;
    }
  }

  // Generate workshop certificate preview
  generateCertificatePreview(): void {
    const studentName = 'Your Name'; // This would come from user input
    console.log(`Generating certificate preview for: ${studentName}`);

    this.trackEvent('certificate_preview_generated', { student_name: studentName });

    // Implement certificate preview logic
    // Could open a modal or navigate to preview page
  }

  // Download workshop materials (post-workshop)
  downloadWorkshopMaterials(): void {
    console.log('Downloading workshop materials...');

    this.trackEvent('materials_download_attempt');

    // Implement download logic
    // const materialsUrl = 'https://be10x.com/downloads/ai-tools-materials.zip';
    // window.open(materialsUrl, '_blank');

    alert('Workshop materials will be available for download after completing the live session.');
  }

  // Subscribe to newsletter
  subscribeToNewsletter(email: string): void {
    if (this.validateEmail(email)) {
      console.log('Newsletter subscription:', email);

      this.trackEvent('newsletter_subscription', { email });

      // Implement newsletter subscription logic
      // this.newsletterService.subscribe(email).subscribe();

      alert('Thank you for subscribing! You\'ll receive updates about upcoming workshops.');
    } else {
      alert('Please enter a valid email address.');
    }
  }

  // Email validation utility
  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Get workshop agenda/curriculum
  getWorkshopAgenda(): string[] {
    return [
      'Introduction to AI Tools & ChatGPT',
      'Advanced Prompting Techniques',
      'AI Tools for Excel Automation',
      'Creating Presentations with AI',
      'Interview Preparation using AI',
      'Research & Report Building',
      'Coding with AI Assistance',
      'LinkedIn Lead Generation',
      'Building Your AI Toolkit',
      'Q&A and Live Demonstrations'
    ];
  }

  // Get workshop bonuses list
  getWorkshopBonuses(): { title: string; value: number; description: string }[] {
    return [
      {
        title: '50x Productivity Hacks',
        value: 2999,
        description: 'Ready-to-implement techniques to multiply your output'
      },
      {
        title: '20+ PPT Templates',
        value: 1999,
        description: 'Professional presentation templates'
      },
      {
        title: 'Time Management Methods',
        value: 1500,
        description: 'Proven strategies for better time management'
      },
      {
        title: 'AI Tools Cheat Sheet',
        value: 2000,
        description: 'Quick reference guide for all AI tools'
      },
      {
        title: 'Exclusive Community Access',
        value: 2002,
        description: 'Join our private community of AI professionals'
      }
    ];
  }

  // Calculate total bonus value
  getTotalBonusValue(): number {
    return this.getWorkshopBonuses().reduce((total, bonus) => total + bonus.value, 0);
  }

  // Get testimonials
  getTestimonials(): { name: string; role: string; message: string; rating: number }[] {
    return [
      {
        name: 'Rahul Sharma',
        role: 'Software Engineer',
        message: 'This workshop transformed my productivity. I now complete tasks in half the time!',
        rating: 5
      },
      {
        name: 'Priya Patel',
        role: 'Marketing Manager',
        message: 'The AI tools taught here helped me create amazing presentations effortlessly.',
        rating: 5
      },
      {
        name: 'Amit Kumar',
        role: 'Data Analyst',
        message: 'Excellent workshop! The Excel automation techniques are game-changing.',
        rating: 5
      }
    ];
  }

  // Get workshop statistics
  getWorkshopStats(): { label: string; value: string }[] {
    return [
      { label: 'Students Trained', value: '100,000+' },
      { label: 'Average Rating', value: '4.8/5' },
      { label: 'Success Rate', value: '98%' },
      { label: 'Workshop Duration', value: '3+ Hours' },
      { label: 'AI Tools Covered', value: '20+' },
      { label: 'Certificate Value', value: 'Industry Recognized' }
    ];
  }

  // Handle payment gateway integration
  initiatePayment(): void {
    console.log('Initiating payment process...');

    const paymentData = {
      amount: 9, // Rs. 9
      currency: 'INR',
      description: 'AI Tools & ChatGPT Workshop',
      workshopDate: '2025-09-09',
      bonusValue: this.getTotalBonusValue()
    };

    this.trackEvent('payment_initiated', paymentData);

    // Implement Razorpay or other payment gateway integration
    // this.paymentService.createOrder(paymentData).subscribe();

    alert('Redirecting to secure payment gateway...');
  }

  // Handle successful payment
  onPaymentSuccess(paymentDetails: any): void {
    console.log('Payment successful:', paymentDetails);

    this.trackEvent('payment_success', paymentDetails);

    // Send confirmation email, update database, etc.
    // this.registrationService.confirmRegistration(paymentDetails).subscribe();

    alert('🎉 Registration successful! Check your email for workshop details.');
  }

  // Handle payment failure
  onPaymentFailure(error: any): void {
    console.error('Payment failed:', error);

    this.trackEvent('payment_failure', { error: error.message });

    alert('Payment failed. Please try again or contact support.');
  }

  routedetails():void{
    this.router.navigate(['/details']);

  }



}
