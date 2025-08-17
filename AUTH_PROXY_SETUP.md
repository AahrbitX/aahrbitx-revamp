# 🔐 Supabase Auth Proxy Setup Guide

This guide explains how to set up a custom auth proxy to avoid URL mismatches with free Supabase plans.

## 🎯 What This Solves

- **URL Mismatches**: Free Supabase plans show your Supabase project URL in verification emails
- **Branding**: Users see your domain (`auth.aahrbitx.in`) instead of `supabase.co` URLs
- **User Experience**: Seamless verification flow through your own domain

## 🚀 Step-by-Step Implementation

### 1. DNS Configuration

Add these DNS records in your domain provider (`aahrbitx.in`):

```dns
# For auth subdomain
Type: CNAME
Host: auth
Value: your-app.vercel.app (or your Express server)

# For app subdomain (optional, for better organization)
Type: CNAME
Host: app
Value: your-app.vercel.app
```

### 2. Environment Variables

Ensure these are set in your `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NODE_ENV=development # or production
```

### 3. Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── verify/
│   │       └── route.ts          # Proxy endpoint
│   └── auth/
│       └── verification-error/
│           └── page.tsx          # Error page
├── lib/
│   └── config.ts                 # URL configuration
└── utils/
    └── supabase/
        ├── custom-auth.ts        # Custom auth client
        └── server.ts             # Original server client
```

## 🔧 How It Works

### 1. User Signup Flow

1. User fills signup form
2. `signUpWithCustomRedirect()` is called with custom `emailRedirectTo`
3. Supabase sends verification email with your domain URL
4. User clicks: `https://auth.aahrbitx.in/api/verify?token=...&type=signup`

### 2. Verification Proxy

1. Your API route (`/api/verify`) receives the request
2. It forwards the token to Supabase's verify endpoint
3. On success: redirects to `https://app.aahrbitx.in/dashboard`
4. On failure: redirects to error page

### 3. URL Structure

- **Auth Domain**: `https://auth.aahrbitx.in`
- **App Domain**: `https://app.aahrbitx.in`
- **Main Site**: `https://aahrbitx.in`

## ⚠️ Why We Need Custom Signup

**Important**: We cannot use the original Supabase signup because:

- **Original signup**: Sends emails with `supabase.co` URLs → causes URL mismatches
- **Custom signup**: Sends emails with your domain → solves the problem completely

The `signUpWithCustomRedirect()` function is **essential** - it tells Supabase to use your domain in verification emails instead of their default URLs.

## 🎨 Customization

### Change Redirect URLs

Edit `src/lib/config.ts`:

```typescript
urls: {
  production: {
    auth: "https://auth.aahrbitx.in",
    app: "https://app.aahrbitx.in",      // Change this
    main: "https://aahrbitx.in",
  },
  // ...
}
```

### Custom Success/Error Pages

1. **Success**: Update `config.dashboardUrl` in `config.ts`
2. **Error**: Update `config.verificationErrorUrl` in `config.ts`

## 🧪 Testing

### Local Development

1. Start your dev server: `npm run dev`
2. Sign up with a test email
3. Check verification email (should contain `localhost:3000/api/verify`)
4. Click link → should redirect to dashboard

### Production Testing

1. Deploy to Vercel/your hosting
2. Update DNS records
3. Test signup flow
4. Verify emails contain `https://auth.aahrbitx.in/api/verify`

## 🚨 Troubleshooting

### Common Issues

1. **DNS Not Propagated**: Wait 24-48 hours for DNS changes
2. **CORS Errors**: Ensure your API route handles CORS properly
3. **Redirect Loops**: Check that verification URLs are correct
4. **Signup Not Working**: Ensure you're using `signUpWithCustomRedirect()`, not the original Supabase client

### Debug Steps

1. Check browser network tab for failed requests
2. Verify environment variables are set correctly
3. Check Supabase logs for auth errors
4. Test API endpoint directly: `/api/verify?token=test&type=signup`
5. Verify signup is using custom auth client

## 🔒 Security Considerations

- **Token Validation**: Supabase handles token validation
- **HTTPS Only**: Always use HTTPS in production
- **Rate Limiting**: Consider adding rate limiting to `/api/verify`
- **Logging**: Monitor verification attempts for security

## 📚 Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [DNS Configuration Guide](https://vercel.com/docs/concepts/projects/domains)

## 🎉 What You've Achieved

✅ **Branded Verification URLs**: Users see your domain, not Supabase  
✅ **Seamless User Experience**: Clean verification flow  
✅ **Professional Appearance**: No more generic Supabase URLs  
✅ **Easy Maintenance**: Centralized configuration in `config.ts`  
✅ **Environment Aware**: Different URLs for dev/prod  
✅ **Complete Solution**: Both signup emails AND verification flow use your domain  

Your users will now have a **completely professional, branded authentication experience**! 🚀

## 💡 Key Takeaway

**Don't skip the custom signup** - it's the foundation that makes everything work. Without it, users still see Supabase URLs in emails, which defeats the purpose of the proxy solution.
