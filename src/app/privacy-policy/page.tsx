import type { Metadata } from 'next';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import MarketTicker from '@/components/MarketTicker';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy — GeoWire',
  description: 'GeoWire privacy policy. How we collect, use, and protect your information.',
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'March 24, 2026';

  return (
    <div className="min-h-screen bg-bg-0">
      <MarketTicker />
      <Header />
      <Navigation />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="font-display text-3xl sm:text-4xl text-tx-0 mb-2">Privacy Policy</h1>
        <p className="font-mono text-xs text-tx-3 mb-10">Last updated: {lastUpdated}</p>

        <div className="space-y-8 text-tx-1 leading-relaxed">

          <section>
            <h2 className="font-display text-xl text-tx-0 mb-3">1. Overview</h2>
            <p>
              GeoWire (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates geowire.org (the &quot;Site&quot;). This Privacy Policy
              explains how we collect, use, disclose, and protect information when you visit our Site.
              By using GeoWire, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-tx-0 mb-3">2. Information We Collect</h2>
            <h3 className="font-semibold text-tx-0 mb-2">Automatically Collected Data</h3>
            <p className="mb-4">
              When you visit GeoWire, our servers and third-party services may automatically collect:
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2"><span className="text-accent-gold mt-1">•</span>IP address and approximate geographic location (country/region level)</li>
              <li className="flex items-start gap-2"><span className="text-accent-gold mt-1">•</span>Browser type and version, operating system</li>
              <li className="flex items-start gap-2"><span className="text-accent-gold mt-1">•</span>Pages visited, time spent, referring URLs</li>
              <li className="flex items-start gap-2"><span className="text-accent-gold mt-1">•</span>Device type and screen resolution</li>
            </ul>

            <h3 className="font-semibold text-tx-0 mt-6 mb-2">Information You Provide</h3>
            <p>
              GeoWire does not require account registration. If you contact us by email, we collect the
              information you voluntarily provide in that communication.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-tx-0 mb-3">3. Cookies and Tracking Technologies</h2>
            <p className="mb-4">
              GeoWire uses cookies and similar tracking technologies to operate and improve the Site.
              These include:
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2"><span className="text-accent-gold mt-1">•</span><strong className="text-tx-0">Essential cookies:</strong> Required for the Site to function correctly (e.g., session state).</li>
              <li className="flex items-start gap-2"><span className="text-accent-gold mt-1">•</span><strong className="text-tx-0">Analytics cookies:</strong> Used to understand how visitors interact with the Site (e.g., page views, traffic sources).</li>
              <li className="flex items-start gap-2"><span className="text-accent-gold mt-1">•</span><strong className="text-tx-0">Advertising cookies:</strong> Used by Google AdSense to serve relevant advertisements based on your interests and prior browsing behavior.</li>
            </ul>
            <p className="mt-4">
              You may control cookies through your browser settings. Disabling cookies may affect the
              functionality of certain features. For more information on opting out of interest-based
              advertising, visit{' '}
              <a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-accent-gold hover:underline">aboutads.info</a>{' '}
              or{' '}
              <a href="https://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer" className="text-accent-gold hover:underline">networkadvertising.org</a>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-tx-0 mb-3">4. Google AdSense and Third-Party Advertising</h2>
            <p className="mb-4">
              GeoWire uses Google AdSense to display advertisements. Google, as a third-party vendor,
              uses cookies to serve ads based on your prior visits to this website and other websites.
              Google&apos;s use of advertising cookies enables it and its partners to serve ads to you
              based on your visit to GeoWire and/or other sites on the Internet.
            </p>
            <p>
              You may opt out of personalized advertising by visiting{' '}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-accent-gold hover:underline">Google Ads Settings</a>.
              Alternatively, you can opt out of a third-party vendor&apos;s use of cookies for personalized
              advertising by visiting{' '}
              <a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-accent-gold hover:underline">www.aboutads.info</a>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-tx-0 mb-3">5. How We Use Your Information</h2>
            <p className="mb-4">We use collected information to:</p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2"><span className="text-accent-gold mt-1">•</span>Operate, maintain, and improve GeoWire</li>
              <li className="flex items-start gap-2"><span className="text-accent-gold mt-1">•</span>Analyze traffic patterns and user behavior to improve content</li>
              <li className="flex items-start gap-2"><span className="text-accent-gold mt-1">•</span>Display relevant advertisements through Google AdSense</li>
              <li className="flex items-start gap-2"><span className="text-accent-gold mt-1">•</span>Respond to inquiries sent to us via email</li>
              <li className="flex items-start gap-2"><span className="text-accent-gold mt-1">•</span>Detect and prevent fraud or abuse</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl text-tx-0 mb-3">6. Data Sharing and Disclosure</h2>
            <p className="mb-4">We do not sell, trade, or rent your personal information to third parties. We may share data with:</p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2"><span className="text-accent-gold mt-1">•</span><strong className="text-tx-0">Service providers:</strong> Analytics platforms, hosting providers, and advertising networks (including Google) that help us operate the Site.</li>
              <li className="flex items-start gap-2"><span className="text-accent-gold mt-1">•</span><strong className="text-tx-0">Legal requirements:</strong> When required by law, court order, or governmental authority.</li>
              <li className="flex items-start gap-2"><span className="text-accent-gold mt-1">•</span><strong className="text-tx-0">Business transfers:</strong> In connection with a merger, acquisition, or sale of all or part of our assets.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl text-tx-0 mb-3">7. Data Retention</h2>
            <p>
              We retain automatically collected analytics data for up to 26 months. Email communications
              are retained for as long as necessary to respond to your inquiry or as required by law.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-tx-0 mb-3">8. Children&apos;s Privacy</h2>
            <p>
              GeoWire is not directed at children under the age of 13. We do not knowingly collect
              personal information from children under 13. If you believe a child has provided us with
              personal information, please contact us and we will promptly delete it.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-tx-0 mb-3">9. Your Rights</h2>
            <p className="mb-4">
              Depending on your location, you may have certain rights regarding your personal data:
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2"><span className="text-accent-gold mt-1">•</span><strong className="text-tx-0">Access and portability:</strong> Request a copy of the data we hold about you.</li>
              <li className="flex items-start gap-2"><span className="text-accent-gold mt-1">•</span><strong className="text-tx-0">Correction:</strong> Request correction of inaccurate data.</li>
              <li className="flex items-start gap-2"><span className="text-accent-gold mt-1">•</span><strong className="text-tx-0">Deletion:</strong> Request deletion of your personal data.</li>
              <li className="flex items-start gap-2"><span className="text-accent-gold mt-1">•</span><strong className="text-tx-0">Opt-out:</strong> Opt out of personalized advertising as described in Section 4.</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, contact us at <span className="text-accent-gold">contact@geowire.org</span>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-tx-0 mb-3">10. California Privacy Rights (CCPA)</h2>
            <p>
              California residents have additional rights under the California Consumer Privacy Act (CCPA),
              including the right to know what personal information we collect, the right to delete personal
              information, and the right to opt out of the sale of personal information. GeoWire does not
              sell personal information. To exercise your CCPA rights, contact us at{' '}
              <span className="text-accent-gold">contact@geowire.org</span>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-tx-0 mb-3">11. International Transfers</h2>
            <p>
              GeoWire operates from the United States. If you access our Site from outside the United
              States, your information may be transferred to and processed in the United States, where
              data protection laws may differ from those in your country.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-tx-0 mb-3">12. Security</h2>
            <p>
              We implement commercially reasonable technical and organizational measures to protect your
              information. However, no method of transmission over the Internet or electronic storage is
              100% secure. We cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-tx-0 mb-3">13. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of significant
              changes by posting the new policy on this page with an updated &quot;Last updated&quot; date.
              Your continued use of GeoWire after any changes constitutes acceptance of the new policy.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-tx-0 mb-3">14. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us:
            </p>
            <div className="mt-4 bg-bg-2 border border-border rounded p-4 font-mono text-sm space-y-1">
              <p className="text-tx-0 font-semibold">GeoWire Media</p>
              <p className="text-tx-2">Email: <span className="text-accent-gold">contact@geowire.org</span></p>
              <p className="text-tx-2">Chicago, IL, United States</p>
              <p className="text-tx-2">
                <a href="https://x.com/Geowire_org" target="_blank" rel="noopener noreferrer" className="text-accent-gold hover:underline">@Geowire_org</a> on X
              </p>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
