import React, { useState, useEffect } from 'react';
import { AffiliateProgram, AffiliateLink } from '../../types/equipment';
import { affiliateService } from '../../services/affiliateService';

interface AffiliateStats {
  clicks: number;
  conversions: number;
  revenue: number;
  commission: number;
}

const AffiliateSettingsPage: React.FC = () => {
  const [programs, setPrograms] = useState<AffiliateProgram[]>([]);
  const [activeLinks, setActiveLinks] = useState<AffiliateLink[]>([]);
  const [stats, setStats] = useState<AffiliateStats>({
    clicks: 0,
    conversions: 0,
    revenue: 0,
    commission: 0
  });

  const [newLink, setNewLink] = useState({
    programId: '',
    customUrl: '',
    promoCode: ''
  });

  // Mock user ID - in production this would come from auth context
  const userId = 'current-user-id';

  useEffect(() => {
    // Load affiliate programs and user's active links
    const loadAffiliateData = async () => {
      // In production, these would be API calls
      const programs = affiliateService.getAffiliatePrograms();
      const links = await affiliateService.getUserAffiliateLinks(userId);
      setPrograms(programs);
      setActiveLinks(links);
    };

    loadAffiliateData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would create a new affiliate link
    console.log('Create new affiliate link:', newLink);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Affiliate Settings</h1>
          <p className="mt-2 text-sm text-gray-500">
            Manage your affiliate links and track your earnings across different platforms.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900">Performance Overview</h2>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4">
              <div className="bg-coffee-50 overflow-hidden rounded-lg">
                <div className="px-4 py-5">
                  <dt className="text-sm font-medium text-coffee-600 truncate">Total Clicks</dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.clicks}</dd>
                </div>
              </div>
              <div className="bg-coffee-50 overflow-hidden rounded-lg">
                <div className="px-4 py-5">
                  <dt className="text-sm font-medium text-coffee-600 truncate">Conversions</dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.conversions}</dd>
                </div>
              </div>
              <div className="bg-coffee-50 overflow-hidden rounded-lg">
                <div className="px-4 py-5">
                  <dt className="text-sm font-medium text-coffee-600 truncate">Revenue Generated</dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">${stats.revenue.toFixed(2)}</dd>
                </div>
              </div>
              <div className="bg-coffee-50 overflow-hidden rounded-lg">
                <div className="px-4 py-5">
                  <dt className="text-sm font-medium text-coffee-600 truncate">Your Commission</dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">${stats.commission.toFixed(2)}</dd>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Affiliate Programs */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900">Connected Programs</h2>
            <div className="mt-5 space-y-4">
              {programs.map((program) => (
                <div key={program.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{program.name}</h3>
                      <p className="text-sm text-gray-500">
                        Base commission rate: {(program.defaultCommission * 100).toFixed(1)}%
                      </p>
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-coffee-300 shadow-sm text-sm leading-4 font-medium rounded-md text-coffee-700 bg-white hover:bg-coffee-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coffee-500"
                    >
                      Configure
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Custom Links */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900">Custom Affiliate Links</h2>
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label htmlFor="program" className="block text-sm font-medium text-gray-700">
                  Program
                </label>
                <select
                  id="program"
                  value={newLink.programId}
                  onChange={(e) => setNewLink({ ...newLink, programId: e.target.value })}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-coffee-500 focus:border-coffee-500 sm:text-sm rounded-md"
                >
                  <option value="">Select a program</option>
                  {programs.map((program) => (
                    <option key={program.id} value={program.id}>
                      {program.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="customUrl" className="block text-sm font-medium text-gray-700">
                  Custom Tracking URL (Optional)
                </label>
                <input
                  type="url"
                  id="customUrl"
                  value={newLink.customUrl}
                  onChange={(e) => setNewLink({ ...newLink, customUrl: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-coffee-500 focus:border-coffee-500 sm:text-sm"
                  placeholder="https://example.com?ref=your-custom-tag"
                />
              </div>

              <div>
                <label htmlFor="promoCode" className="block text-sm font-medium text-gray-700">
                  Promo Code (Optional)
                </label>
                <input
                  type="text"
                  id="promoCode"
                  value={newLink.promoCode}
                  onChange={(e) => setNewLink({ ...newLink, promoCode: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-coffee-500 focus:border-coffee-500 sm:text-sm"
                  placeholder="COFFEE10"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-coffee-600 hover:bg-coffee-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coffee-500"
                >
                  Add Custom Link
                </button>
              </div>
            </form>

            {/* Active Links Table */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900">Active Links</h3>
              <div className="mt-4 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Program</th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">URL/Code</th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Commission</th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                            <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                              <span className="sr-only">Actions</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {activeLinks.map((link) => (
                            <tr key={link.id}>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                                {programs.find(p => p.id === link.programId)?.name}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {link.customUrl || link.promoCode}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {(link.commission * 100).toFixed(1)}%
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                  link.active
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {link.active ? 'Active' : 'Inactive'}
                                </span>
                              </td>
                              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                <button
                                  type="button"
                                  className="text-coffee-600 hover:text-coffee-900"
                                >
                                  Edit
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateSettingsPage; 