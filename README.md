# VideoHub - AdultDataLink API Integration

A modern, responsive adult content web application built with Next.js 14, TypeScript, and Tailwind CSS. Features a glassmorphism UI design and integrates with the AdultDataLink API for fetching adult video metadata.

## 🚀 Features

- **Modern Glassmorphism UI**: Semi-transparent backgrounds, blur effects, and vibrant orange/pink accents
- **AdultDataLink API Integration**: Real-time video metadata fetching with authentication
- **Advanced Category Filtering**: Gay, Lesbian, Straight, Trans, MILF, and more
- **SWC Compilation Fallback**: Configured to avoid native binary loading issues
- **Responsive Design**: Optimized for mobile, tablet, and desktop viewing
- **Server-Side Rendering**: Built with Next.js 14 App Router for optimal performance
- **TypeScript**: Full type safety throughout the application
- **Safety Features**: Adult content disclaimer and age verification

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom glassmorphism utilities
- **API Integration**: AdultDataLink API with Axios
- **Icons**: Lucide React
- **Fonts**: Inter (Google Fonts)

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd videohub-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your AdultDataLink API key:
   ```env
   ADULTDATALINK_API_KEY=your_api_key_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:3000`

## 🔧 Configuration

### AdultDataLink API Setup

1. **Register for an API key**:
   - Visit [account.adultdatalink.com](https://account.adultdatalink.com)
   - Create an account and obtain your API key
   - Add the key to your `.env.local` file

2. **API Endpoints Used**:
   - `GET /search` - Search videos by query and category
   - `GET /category/{category}` - Fetch videos by specific category

### SWC Compilation Workaround

This application is configured to handle SWC native binary loading issues:

```javascript
// next.config.js
module.exports = {
  swcMinify: false,
  experimental: {
    forceSwcTransforms: false,
  },
  // ... other config
};
```

### Troubleshooting SWC Issues

If you encounter SWC-related errors:

1. **Rebuild SWC dependencies**:
   ```bash
   npm rebuild @next/swc-linux-x64-musl
   npm rebuild @next/swc-linux-x64-gnu
   ```

2. **Use Docker with Debian base**:
   ```dockerfile
   FROM node:18-bullseye-slim
   # ... rest of Dockerfile
   ```

3. **Alternative: Disable SWC completely**:
   ```javascript
   // next.config.js
   module.exports = {
     swcMinify: false,
     compiler: {
       // Use Babel instead
     }
   };
   ```

### Proxy Configuration (for Region Restrictions)

If you need to use a proxy for region-blocked access:

```env
# .env.local
HTTP_PROXY=http://proxy-server:port
HTTPS_PROXY=https://proxy-server:port
```

The application will automatically use these proxy settings for API requests.

## 🎨 Design System

### Color Palette
- **Primary Orange**: `#ff9000`
- **Primary Pink**: `#ff6b9d`
- **Dark Background**: `#1a1a1a`
- **Darker Background**: `#0f0f0f`

### Glassmorphism Effects
```css
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

## 🔍 API Usage Examples

### Basic Search
```typescript
const response = await fetch('/api/search?query=keyword&page=1');
const data = await response.json();
```

### Category Filtering
```typescript
const response = await fetch('/api/search?category=gay&page=1');
const data = await response.json();
```

### Combined Search
```typescript
const response = await fetch('/api/search?query=keyword&category=lesbian&page=2');
const data = await response.json();
```

## 🚨 Important Notes

### Legal Compliance
- This application is intended for educational and demonstration purposes
- Users must be 18+ years of age
- Ensure compliance with local laws and regulations
- Adult content warning is displayed on first visit

### Network Considerations
- Some regions may have restricted access to adult content APIs
- Consider using VPN or proxy services if needed
- Respect API rate limits and server resources
- The AdultDataLink API may have regional restrictions

### Production Deployment

#### Environment Variables
```env
ADULTDATALINK_API_KEY=your_production_api_key
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

#### Build Configuration
```bash
npm run build
npm start
```

#### Docker Deployment
```dockerfile
FROM node:18-bullseye-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔒 Privacy & Security

- API keys are stored securely in environment variables
- All external API calls are made server-side
- No user data is stored or tracked locally
- External links open with security attributes
- CORS headers configured for development

## 🤝 Contributing

This is a demonstration project. For educational purposes:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is for educational and demonstration purposes only. Please respect:
- AdultDataLink's Terms of Service
- API usage guidelines and rate limits
- Local laws and regulations
- Age restrictions (18+)

## 🆘 Troubleshooting

### Common Issues

1. **API Not Working**: 
   - Check your API key in `.env.local`
   - Verify network connectivity
   - Check for regional restrictions

2. **SWC Binary Errors**:
   - Use the provided `next.config.js` configuration
   - Rebuild SWC dependencies
   - Consider using Docker with Debian base image

3. **Images Not Loading**: 
   - Verify CORS settings
   - Check image URLs in API responses
   - Ensure proper error handling

4. **Build Errors**: 
   - Ensure all dependencies are properly installed
   - Check TypeScript configuration
   - Verify environment variables

### Support

For technical issues related to the code implementation:
- Next.js Documentation: [nextjs.org/docs](https://nextjs.org/docs)
- Tailwind CSS Documentation: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- AdultDataLink API Documentation: [adultdatalink.com/docs](https://adultdatalink.com/docs)

---

**⚠️ Disclaimer**: This application is for educational and demonstration purposes only. It showcases modern web development techniques including Next.js, TypeScript, API integration, and glassmorphism design. Users must comply with local laws and age restrictions (18+).