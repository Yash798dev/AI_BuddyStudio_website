import { CommonModule } from '@angular/common';
import { Component,OnInit,OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
interface FormData {
  fullName: string;
  email: string;
  mobile: string;
  age: string;
}
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit, OnDestroy {

  // Form Data
  formData: FormData = {
    fullName: '',
    email: '',
    mobile: '',
    age: ''
  };

  // Form State
  isSubmitting: boolean = false;

  // Timer
  private timerInterval: any;
  timerValue: string = '93:09';

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.startTimer();
    this.trackPageView();
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  // Timer Logic
  startTimer(): void {
    let totalSeconds = 93 * 60 + 9; // 93:09 in seconds

    this.timerInterval = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        this.timerValue = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      } else {
        this.timerValue = '00:00';
        if (this.timerInterval) {
          clearInterval(this.timerInterval);
        }
      }
    }, 1000);
  }

  // Form Submission
  onSubmit(): void {
    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    // Track form submission
    this.trackEvent('registration_form_submit', {
      fullName: this.formData.fullName,
      email: this.formData.email,
      mobile: this.formData.mobile,
      age: this.formData.age,
      timestamp: new Date().toISOString()
    });

    // Simulate form processing
    setTimeout(() => {
      this.processRegistration();
    }, 2000);
  }

  private processRegistration(): void {
    console.log('Processing registration:', this.formData);

    // Validate form data
    if (this.validateFormData()) {
      // Proceed to payment
      this.redirectToPayment();
    } else {
      this.isSubmitting = false;
      alert('Please fill all required fields correctly.');
    }
  }

  private validateFormData(): boolean {
    const { fullName, email, mobile, age } = this.formData;

    // Check required fields
    if (!fullName.trim() || !email.trim() || !mobile.trim() || !age.trim()) {
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return false;
    }

    // Validate mobile number (10 digits)
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
      return false;
    }

    return true;
  }

  private redirectToPayment(): void {
    // Track successful validation
    this.trackEvent('registration_validation_success', this.formData);

    // Prepare payment data
    const paymentData = {
      amount: 9, // Rs. 9
      currency: 'INR',
      description: 'AI Tools & ChatGPT Workshop Registration',
      customerName: this.formData.fullName,
      customerEmail: this.formData.email,
      customerMobile: this.formData.mobile,
      customerAge: this.formData.age,
      workshopDate: '2025-09-09T19:00:00',
      bonusValue: 10500
    };

    // For demo purposes - show success message
    this.isSubmitting = false;
    alert(`✅ Registration Successful!\n\nWelcome ${this.formData.fullName}!\n\nWorkshop Details:\n📅 September 9, 2025\n🕒 7:00 PM onwards\n💰 Amount: ₹9 + GST\n🎁 Bonuses: Worth ₹10,500\n\nRedirecting to payment gateway...`);
    this.router.navigate(['/payments']);
    // In real implementation:
    // this.paymentService.initiatePayment(paymentData);
    // this.router.navigate(['/payment'], { state: { paymentData } });
  }

  // Event Tracking
  private trackEvent(eventName: string, eventData?: any): void {
    console.log(`Event tracked: ${eventName}`, eventData);

    // Implement your analytics tracking
    // Examples:

    // Google Analytics 4
    // gtag('event', eventName, {
    //   event_category: 'registration',
    //   event_label: 'ai_tools_workshop',
    //   custom_parameters: eventData
    // });

    // Facebook Pixel
    // fbq('track', eventName, eventData);

    // Custom Analytics
    // this.analyticsService.track(eventName, eventData);
  }

  private trackPageView(): void {
    this.trackEvent('registration_page_view', {
      timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent,
      referrer: document.referrer
    });
  }

  // Utility Methods
  formatMobileNumber(event: any): void {
    let value = event.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length > 10) {
      value = value.substring(0, 10); // Limit to 10 digits
    }
    this.formData.mobile = value;
    event.target.value = value;
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Form Field Event Handlers
  onNameChange(): void {
    this.trackEvent('form_field_interaction', { field: 'fullName' });
  }

  onEmailChange(): void {
    this.trackEvent('form_field_interaction', { field: 'email' });
  }

  onMobileChange(): void {
    this.trackEvent('form_field_interaction', { field: 'mobile' });
  }

  onAgeChange(): void {
    this.trackEvent('form_field_interaction', { field: 'age' });
  }

  // Terms and Privacy Links
  openTerms(): void {
    this.trackEvent('terms_link_click');
    // Open terms page or modal
    // this.router.navigate(['/terms']);
    console.log('Opening Terms of Service');
  }

  openPrivacy(): void {
    this.trackEvent('privacy_link_click');
    // Open privacy page or modal
    // this.router.navigate(['/privacy']);
    console.log('Opening Privacy Policy');
  }

  openRefundPolicy(): void {
    this.trackEvent('refund_policy_link_click');
    // Open refund policy page or modal
    // this.router.navigate(['/refund-policy']);
    console.log('Opening Refund Policy');
  }

  // Age Group Options
  getAgeGroups(): { value: string; label: string }[] {
    return [
      { value: '18-25', label: '18-25 years' },
      { value: '26-35', label: '26-35 years' },
      { value: '36-45', label: '36-45 years' },
      { value: '46-55', label: '46-55 years' },
      { value: '55+', label: '55+ years' }
    ];
  }

  // WhatsApp Integration
  sendWhatsAppConfirmation(): void {
    const message = `🎉 Registration Confirmed!\n\nWorkshop: AI Tools & ChatGPT\n📅 Date: September 9, 2025\n🕒 Time: 7:00 PM onwards\n💰 Amount: ₹9 + GST\n\nYou'll receive workshop link 30 minutes before the session.`;

    const whatsappUrl = `https://wa.me/91${this.formData.mobile}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    this.trackEvent('whatsapp_confirmation_sent', { mobile: this.formData.mobile });
  }

  // Get Registration Summary
  getRegistrationSummary(): any {
    return {
      participant: {
        name: this.formData.fullName,
        email: this.formData.email,
        mobile: this.formData.mobile,
        age: this.formData.age
      },
      workshop: {
        title: 'AI Tools & ChatGPT Workshop',
        date: 'September 9, 2025',
        time: '7:00 PM onwards',
        duration: '3+ hours',
        mode: 'Live Online'
      },
      pricing: {
        originalPrice: 929,
        discountedPrice: 9,
        gst: 'Applicable',
        bonusValue: 10500,
        savings: 920
      },
      features: [
        'Live Interactive Session',
        'Industry Recognized Certificate',
        'Lifetime Access to Resources',
        'WhatsApp Support Group',
        'Bonus Materials Worth ₹10,500'
      ]
    };
  }

  // Handle Payment Success Callback
  onPaymentSuccess(paymentDetails: any): void {
    console.log('Payment successful:', paymentDetails);

    this.trackEvent('payment_success', {
      ...paymentDetails,
      participant: this.formData
    });

    // Send confirmation messages
    this.sendConfirmationEmail();
    this.sendWhatsAppConfirmation();

    // Navigate to success page
    // this.router.navigate(['/registration-success'], {
    //   state: { registrationData: this.getRegistrationSummary() }
    // });
  }

  // Send Confirmation Email
  private sendConfirmationEmail(): void {
    const emailData = {
      to: this.formData.email,
      subject: 'Registration Confirmed - AI Tools Workshop',
      template: 'workshop_registration_confirmation',
      data: this.getRegistrationSummary()
    };

    // In real implementation:
    // this.emailService.sendConfirmationEmail(emailData).subscribe();

    console.log('Confirmation email sent to:', this.formData.email);
    this.trackEvent('confirmation_email_sent', { email: this.formData.email });
  }

  // Handle Payment Failure
  onPaymentFailure(error: any): void {
    console.error('Payment failed:', error);

    this.trackEvent('payment_failure', {
      error: error.message,
      participant: this.formData
    });

    this.isSubmitting = false;
    alert('Payment failed. Please try again or contact support.');
  }

  // Clear Form Data
  clearForm(): void {
    this.formData = {
      fullName: '',
      email: '',
      mobile: '',
      age: ''
    };

    this.trackEvent('form_cleared');
  }

  // Get Workshop Benefits
  getWorkshopBenefits(): string[] {
    return [
      'Master 20+ AI Tools including ChatGPT, DALL-E',
      'Excel Automation without memorizing formulas',
      'Create stunning presentations in minutes',
      'Interview preparation and career advancement',
      'Research and report building with AI',
      'Coding assistance without technical knowledge',
      'LinkedIn lead generation strategies',
      'Time management and productivity hacks',
      'Industry-recognized certification',
      'Lifetime access to workshop materials'
    ];
  }

  // Pre-fill Form (for testing or returning users)
  prefillForm(userData: Partial<FormData>): void {
    this.formData = { ...this.formData, ...userData };
    this.trackEvent('form_prefilled', userData);
  }

  // Export Registration Data
  exportRegistrationData(): any {
    return {
      timestamp: new Date().toISOString(),
      formData: this.formData,
      timerValue: this.timerValue,
      workshopDetails: {
        title: 'AI Tools & ChatGPT Workshop',
        date: '2025-09-09',
        time: '19:00',
        duration: '3+ hours',
        price: 9,
        originalPrice: 929,
        bonusValue: 10500
      }
    };
  }

}
