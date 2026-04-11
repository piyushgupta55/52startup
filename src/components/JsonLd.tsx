export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "52Startup",
    "url": "https://52startup.com",
    "description": "52 Startups. 52 Weeks. One Mission. Make India Great Again.",
    "publisher": {
      "@type": "Person",
      "name": "Founder",
      "sameAs": [
        "https://twitter.com/52startup",
        "https://linkedin.com/in/52startup"
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
