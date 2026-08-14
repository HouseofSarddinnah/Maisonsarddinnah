# 301 Redirect Deployment Guide
**Purpose:** Implement permanent 301 redirect from www to non-www canonical domain

**Target:** `https://maisonsarddinnah.com` (non-www)

---

## Overview

This guide provides instructions for implementing a server-level 301 redirect to ensure all traffic from `www.maisonsarddinnah.com` and `http://www.maisonsarddinnah.com` is permanently redirected to the canonical domain `https://maisonsarddinnah.com`.

**Configuration Files Created:**
1. `.htaccess` - Apache configuration
2. `nginx-redirect.conf` - Nginx configuration
3. `netlify.toml` - Netlify configuration
4. `vercel.json` - Vercel configuration

---

## Choose Your Hosting Platform

Select the configuration that matches your hosting platform:

### 1. Apache Server (.htaccess)

**When to use:** Traditional Apache hosting, shared hosting, cPanel, or any server using Apache with `.htaccess` support.

**Implementation Steps:**

1. **Upload .htaccess file**
   - The `.htaccess` file has already been created in your project root
   - Upload it to your web server's root directory (public_html or www)
   - Ensure the file name is exactly `.htaccess` (with the leading dot)

2. **Verify mod_rewrite is enabled**
   - Contact your hosting provider to ensure `mod_rewrite` is enabled
   - Most Apache installations have this enabled by default

3. **Test the redirect**
   - Visit `https://www.maisonsarddinnah.com`
   - Should automatically redirect to `https://maisonsarddinnah.com`
   - Visit `http://www.maisonsarddinnah.com`
   - Should automatically redirect to `https://maisonsarddinnah.com`

**Troubleshooting:**
- If redirects don't work, check that `.htaccess` is in the correct directory
- Ensure file permissions are set to 644 (readable by server)
- Check Apache error logs for configuration errors

---

### 2. Nginx Server

**When to use:** VPS, dedicated server, or any server running Nginx.

**Implementation Steps:**

1. **Update Nginx configuration**
   - Copy the contents of `nginx-redirect.conf`
   - Add it to your Nginx server block configuration
   - Location: `/etc/nginx/sites-available/maisonsarddinnah.com` or `/etc/nginx/conf.d/maisonsarddinnah.conf`

2. **Update SSL certificate paths**
   - Replace `/path/to/your/certificate.crt` with your actual SSL certificate path
   - Replace `/path/to/your/private.key` with your actual SSL private key path

3. **Test configuration**
   ```bash
   sudo nginx -t
   ```

4. **Reload Nginx**
   ```bash
   sudo systemctl reload nginx
   # or
   sudo service nginx reload
   ```

5. **Test the redirect**
   - Visit `https://www.maisonsarddinnah.com`
   - Should automatically redirect to `https://maisonsarddinnah.com`

**Troubleshooting:**
- Check Nginx error logs: `sudo tail -f /var/log/nginx/error.log`
- Ensure SSL certificates are valid and paths are correct
- Verify DNS records point to your server

---

### 3. Netlify

**When to use:** Hosting on Netlify platform.

**Implementation Steps:**

1. **Upload netlify.toml**
   - The `netlify.toml` file has already been created in your project root
   - Commit and push it to your Git repository
   - Netlify will automatically detect and apply the configuration

2. **Alternative: Manual configuration**
   - Go to Netlify dashboard
   - Navigate to Site Settings → Domain Management
   - Add redirect rules manually if needed

3. **Test the redirect**
   - Deploy your site to Netlify
   - Visit `https://www.maisonsarddinnah.com`
   - Should automatically redirect to `https://maisonsarddinnah.com`

**Troubleshooting:**
- Ensure `netlify.toml` is in the root of your repository
- Check Netlify deploy logs for configuration errors
- Verify custom domain is properly configured in Netlify

---

### 4. Vercel

**When to use:** Hosting on Vercel platform.

**Implementation Steps:**

1. **Upload vercel.json**
   - The `vercel.json` file has already been created in your project root
   - Commit and push it to your Git repository
   - Vercel will automatically detect and apply the configuration

2. **Alternative: Manual configuration**
   - Go to Vercel dashboard
   - Navigate to Settings → Domains
   - Configure redirects in the dashboard if needed

3. **Test the redirect**
   - Deploy your site to Vercel
   - Visit `https://www.maisonsarddinnah.com`
   - Should automatically redirect to `https://maisonsarddinnah.com`

**Troubleshooting:**
- Ensure `vercel.json` is in the root of your repository
- Check Vercel deployment logs for configuration errors
- Verify custom domain is properly configured in Vercel

---

### 5. Other Platforms

**Cloudflare:**
- Go to Cloudflare dashboard
- Navigate to Page Rules
- Add rule: `*www.maisonsarddinnah.com/*` → `https://maisonsarddinnah.com/$1`
- Set status code to 301 (Permanent Redirect)

**GitHub Pages:**
- GitHub Pages doesn't support server-level redirects
- Use a CNAME file or Jekyll redirect plugin
- Consider using Cloudflare in front of GitHub Pages

**AWS S3 + CloudFront:**
- Configure CloudFront origin to redirect
- Use Lambda@Edge for custom redirect logic
- Or use CloudFront Functions for redirects

---

## Verification Steps

After implementing the redirect, verify it works correctly:

### 1. Test Basic Redirects
```bash
# Test www to non-www
curl -I https://www.maisonsarddinnah.com
# Should return: HTTP/2 301 and Location: https://maisonsarddinnah.com/

# Test HTTP to HTTPS
curl -I http://www.maisonsarddinnah.com
# Should return: HTTP/1.1 301 and Location: https://maisonsarddinnah.com/

# Test path preservation
curl -I https://www.maisonsarddinnah.com/blog/travel/kyoto-travel-guide.html
# Should redirect to: https://maisonsarddinnah.com/blog/travel/kyoto-travel-guide.html
```

### 2. Browser Testing
- Visit `https://www.maisonsarddinnah.com` → should redirect to non-www
- Visit `http://www.maisonsarddinnah.com` → should redirect to HTTPS non-www
- Visit `https://www.maisonsarddinnah.com/blog/travel/kyoto-travel-guide.html` → should preserve path

### 3. Online Tools
- Use https://httpstatus.io/ to test redirects
- Use https://redirectdetective.com/ to verify redirect chains
- Check Google Search Console for redirect issues

---

## Important Notes

### DNS Configuration
Ensure your DNS records are configured correctly:
- **A Record:** `maisonsarddinnah.com` → your server IP
- **CNAME Record:** `www.maisonsarddinnah.com` → `maisonsarddinnah.com` (or your server)
- **HTTPS Certificate:** Must cover both `maisonsarddinnah.com` and `www.maisonsarddinnah.com`

### SSL Certificate
Your SSL certificate must cover both domains:
- **Single Domain Certificate:** Only covers one domain (not recommended)
- **Wildcard Certificate:** Covers `*.maisonsarddinnah.com` (recommended)
- **Multi-Domain (SAN) Certificate:** Covers both `maisonsarddinnah.com` and `www.maisonsarddinnah.com` (recommended)

### SEO Impact
- 301 redirects pass approximately 90-99% of link equity
- Google will update its index over time
- Monitor Search Console for any redirect issues
- Update any internal links to use non-www directly

---

## Testing Checklist

- [ ] `.htaccess` / server configuration uploaded
- [ ] SSL certificate covers both domains
- [ ] DNS records configured correctly
- [ ] HTTP to HTTPS redirect works
- [ ] www to non-www redirect works
- [ ] Path preservation works (e.g., `/blog/page.html`)
- [ ] No redirect loops detected
- [ ] Browser testing successful
- [ ] curl/CLI testing successful
- [ ] Online redirect checker confirms 301 status

---

## Support

If you encounter issues:
1. Check server error logs
2. Verify file permissions
3. Confirm DNS propagation
4. Test with curl for detailed response headers
5. Contact your hosting provider support

---

**Configuration Files Location:**
- `.htaccess` - Apache configuration
- `nginx-redirect.conf` - Nginx configuration
- `netlify.toml` - Netlify configuration
- `vercel.json` - Vercel configuration

**Last Updated:** January 15, 2026
