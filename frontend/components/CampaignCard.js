import { useEffect, useState } from 'react';

export default function CampaignSection() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetch('http://localhost:1337/api/campaigns')
      .then(res => res.json())
      .then(data => setCampaigns(data.data))
      .catch(console.error);
  }, []);

  return (
    <section className="py-12 bg-gray-100">
      <h2 className="text-3xl font-semibold text-center mb-6">Our Campaigns</h2>
      <div className="grid md:grid-cols-2 gap-6 px-4">
        {campaigns.map(campaign => (
          <div key={campaign.id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-2">{campaign.attributes.title}</h3>
            <p>{campaign.attributes.summary}</p>
          </div>
        ))}
      </div>
    </section>
  );
}