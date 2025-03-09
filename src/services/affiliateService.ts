import { AffiliateLink, AffiliateProgram, RetailerLink } from '../types/equipment';

class AffiliateService {
  // Cache affiliate programs and active links
  private affiliatePrograms: Map<string, AffiliateProgram> = new Map();
  private activeLinks: Map<string, AffiliateLink[]> = new Map();

  constructor() {
    this.initializeAffiliatePrograms();
  }

  private initializeAffiliatePrograms() {
    // Initialize with major programs
    const programs: AffiliateProgram[] = [
      {
        id: 'amazon',
        name: 'Amazon Associates',
        baseUrl: 'https://amazon.com',
        defaultCommission: 0.04
      },
      {
        id: 'impact',
        name: 'Impact',
        defaultCommission: 0.08
      },
      // Add more programs as needed
    ];

    programs.forEach(program => {
      this.affiliatePrograms.set(program.id, program);
    });
  }

  // Make this method public
  public async getUserAffiliateLinks(userId: string): Promise<AffiliateLink[]> {
    // Cache hit
    if (this.activeLinks.has(userId)) {
      return this.activeLinks.get(userId) || [];
    }

    // In production, fetch from API/database
    const links: AffiliateLink[] = [];
    this.activeLinks.set(userId, links);
    return links;
  }

  public async getAffiliateUrl(
    retailerLink: RetailerLink,
    userId?: string,
    context?: {
      source?: string;
      campaign?: string;
      medium?: string;
    }
  ): Promise<string> {
    if (!retailerLink.affiliateEnabled) {
      return retailerLink.url;
    }

    // Get user's affiliate links if they exist
    const userLinks = userId ? await this.getUserAffiliateLinks(userId) : [];
    const matchingLink = userLinks.find(link => 
      link.active && link.productId === retailerLink.retailerId
    );

    if (matchingLink?.customUrl) {
      return this.appendUtmParameters(matchingLink.customUrl, context);
    }

    // Generate affiliate URL based on retailer
    switch (retailerLink.retailerId) {
      case 'amazon':
        return this.generateAmazonAffiliateUrl(retailerLink.url, userId);
      default:
        return this.appendUtmParameters(retailerLink.url, context);
    }
  }

  private async generateAmazonAffiliateUrl(baseUrl: string, userId?: string): Promise<string> {
    // In production, lookup user's Amazon Associate ID
    const tag = userId ? await this.getUserAmazonTag(userId) : process.env.REACT_APP_DEFAULT_AMAZON_TAG;
    
    // Add associate tag
    const url = new URL(baseUrl);
    url.searchParams.set('tag', tag || '');
    
    return url.toString();
  }

  private async getUserAmazonTag(userId: string): Promise<string> {
    // In production, fetch from user settings/database
    return 'default-tag-20';
  }

  private appendUtmParameters(url: string, context?: {
    source?: string;
    campaign?: string;
    medium?: string;
  }): string {
    if (!context) return url;

    const urlObj = new URL(url);
    
    if (context.source) urlObj.searchParams.set('utm_source', context.source);
    if (context.campaign) urlObj.searchParams.set('utm_campaign', context.campaign);
    if (context.medium) urlObj.searchParams.set('utm_medium', context.medium);

    return urlObj.toString();
  }

  // Analytics and tracking methods
  public async trackClick(linkId: string, userId?: string): Promise<void> {
    // In production, implement click tracking
    console.log('Track click:', { linkId, userId });
  }

  public async trackPurchase(
    orderId: string,
    amount: number,
    linkId: string,
    userId?: string
  ): Promise<void> {
    // In production, implement purchase tracking
    console.log('Track purchase:', { orderId, amount, linkId, userId });
  }

  // Add method to get affiliate programs
  public getAffiliatePrograms(): AffiliateProgram[] {
    return Array.from(this.affiliatePrograms.values());
  }
}

export const affiliateService = new AffiliateService(); 