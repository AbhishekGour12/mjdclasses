import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPalette, FaBell, FaShieldAlt, FaDownload } from "react-icons/fa";

export default function WebsiteManagement({ websiteSettings, setWebsiteSettings }) {
  return (
    <motion.div
      key="website"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Website Management</h1>
        <p className="text-gray-600">Customize your coaching center website</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Website Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">General Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                <input
                  type="text"
                  value={websiteSettings.siteName}
                  onChange={(e) => setWebsiteSettings({...websiteSettings, siteName: e.target.value})}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
                <textarea
                  value={websiteSettings.siteDescription}
                  onChange={(e) => setWebsiteSettings({...websiteSettings, siteDescription: e.target.value})}
                  rows={3}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={websiteSettings.contactEmail}
                  onChange={(e) => setWebsiteSettings({...websiteSettings, contactEmail: e.target.value})}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="text"
                  value={websiteSettings.phone}
                  onChange={(e) => setWebsiteSettings({...websiteSettings, phone: e.target.value})}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea
                  value={websiteSettings.address}
                  onChange={(e) => setWebsiteSettings({...websiteSettings, address: e.target.value})}
                  rows={2}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Social Media & Theme */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Social Media</h3>
            <div className="space-y-3">
              {Object.entries(websiteSettings.socialMedia).map(([platform, url]) => (
                <div key={platform} className="flex items-center">
                  {platform === 'facebook' && <FaFacebook className="text-blue-600 mr-3" />}
                  {platform === 'twitter' && <FaTwitter className="text-blue-400 mr-3" />}
                  {platform === 'instagram' && <FaInstagram className="text-pink-600 mr-3" />}
                  {platform === 'linkedin' && <FaLinkedin className="text-blue-700 mr-3" />}
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setWebsiteSettings({
                      ...websiteSettings, 
                      socialMedia: {...websiteSettings.socialMedia, [platform]: e.target.value}
                    })}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder={`${platform} URL`}
                  />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Theme Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-xl">
                <div className="flex items-center">
                  <FaPalette className="text-purple-500 mr-3" />
                  <span>Primary Color</span>
                </div>
                <div className="w-6 h-6 bg-purple-600 rounded-full"></div>
              </div>
              <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all">
                Save Changes
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}