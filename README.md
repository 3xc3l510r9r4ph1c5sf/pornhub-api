# VideoHub - Next.js PornHub API Integration

A modern, responsive web application built with Next.js and Tailwind CSS, featuring a glassmorphism UI design inspired by contemporary adult content platforms. This application demonstrates advanced web development techniques including API integration, server-side rendering, and modern UI/UX patterns.

## 🚀 Features

- **Modern Glassmorphism UI**: Semi-transparent backgrounds, blur effects, and vibrant orange/pink accents
- **Responsive Design**: Optimized for mobile, tablet, and desktop viewing
- **Advanced Search & Filtering**: Search by keywords and filter by categories including Gay, Lesbian, Straight
- **Server-Side Rendering**: Built with Next.js for optimal performance and SEO
- **Real-time API Integration**: Fetches video metadata using the PornHub API
- **Pagination Support**: Navigate through multiple pages of results
- **Loading States & Error Handling**: Comprehensive user feedback and error management
- **Safety Features**: Adult content disclaimer and age verification

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom glassmorphism utilities
- **API Integration**: @justalk/pornhub-api
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

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## 🔧 Configuration

### Tailwind CSS Setup

The application uses custom Tailwind CSS utilities for glassmorphism effects:

```css
.glass {
  @apply bg-white/10 backdrop-blur-md border border-white/20 rounded-xl;
}

.glass-hover {
  @apply glass transition-all duration-300 hover:bg-white/15 hover:border-white/30;
}
```

### API Configuration

The PornHub API integration is handled through Next.js API routes in `/pages/api/search.js`. The API supports:

- **Search by keyword**: General text-based search
- **Category filtering**: Gay, Lesbian, Straight, All categories
- **Pagination**: Navigate through multiple result pages
- **Sorting**: Most viewed, trending, recent uploads

### Environment Variables

No environment variables are required for basic functionality. However, for production deployment, consider adding:

```env
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## 🎨 Design System

### Color Palette
- **Primary Orange**: `#ff9000`
- **Primary Pink**: `#ff6b9d`
- **Dark Background**: `#1a1a1a`
- **Darker Background**: `#0f0f0f`

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Glassmorphism Effects
- **Background**: `rgba(255, 255, 255, 0.1)`
- **Backdrop Filter**: `blur(12px) saturate(180%)`
- **Border**: `1px solid rgba(255, 255, 255, 0.2)`

## 🔍 API Usage Examples

### Basic Search
```javascript
// Search for videos with keyword
const response = await fetch('/api/search?query=keyword&page=1');
```

### Category Filtering
```javascript
// Search in specific category
const response = await fetch('/api/search?category=gay&page=1');
```

### Combined Search
```javascript
// Search with keyword in specific category
const response = await fetch('/api/search?query=keyword&category=lesbian&page=2');
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
- The API may have regional restrictions

### Production Deployment
- Add proper error logging and monitoring
- Implement caching for better performance
- Consider CDN integration for global access
- Add proper SEO meta tags and structured data

## 🔒 Privacy & Security

- No user data is stored or tracked
- All API calls are made server-side to protect user privacy
- No cookies or local storage used for tracking
- External links open in new tabs with security attributes

## 🤝 Contributing

This is a demonstration project. For educational purposes, you can:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is for educational and demonstration purposes only. Please respect:
- PornHub's Terms of Service
- API usage guidelines
- Local laws and regulations
- Age restrictions (18+)

## 🆘 Troubleshooting

### Common Issues

1. **API Not Working**: Check network connectivity and regional restrictions
2. **Images Not Loading**: Verify CORS settings and image URLs
3. **Slow Performance**: Consider implementing caching and image optimization
4. **Build Errors**: Ensure all dependencies are properly installed

### Support

For technical issues related to the code implementation, please refer to:
- Next.js Documentation
- Tailwind CSS Documentation
- React Documentation

---

**⚠️ Disclaimer**: This application is for educational and demonstration purposes only. It showcases modern web development techniques and is not intended for commercial use. Users must comply with local laws and age restrictions.