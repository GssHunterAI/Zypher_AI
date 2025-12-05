# Deploy Zypher AI Demo to GitHub Pages

This guide will help you deploy the demo to GitHub Pages using GitHub Actions.

## 🚀 Automated Deployment Setup

### Step 1: Push the GitHub Actions Workflow

The workflow file has been created at `.github/workflows/deploy-demo.yml`. Now commit and push it:

```bash
git add .github/workflows/deploy-demo.yml
git commit -m "Add GitHub Pages deployment workflow"
git push origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/GssHunterAI/Zypher_AI`
2. Click on **Settings** (top menu bar)
3. In the left sidebar, click **Pages**
4. Under **Build and deployment**:
   - **Source**: Select `GitHub Actions` (not "Deploy from a branch")
5. That's it! No need to click Save - it's automatic

### Step 3: Trigger Deployment

The workflow will automatically deploy when:
- You push changes to the `demo/` folder
- You push changes to the workflow file itself
- You manually trigger it from the Actions tab

To manually trigger right now:
1. Go to **Actions** tab in your repository
2. Click on "Deploy Demo to GitHub Pages" workflow
3. Click **Run workflow** button
4. Select `main` branch
5. Click **Run workflow**

### Step 4: Access Your Demo

After deployment completes (1-2 minutes), your demo will be live at:

```
https://gsshunterai.github.io/Zypher_AI/
```

## 📋 What Gets Deployed

The GitHub Action deploys everything in the `demo/` folder:
- ✅ `index.html` - Main demo page
- ✅ `style.css` - Styling
- ✅ `app.js` - Demo functionality with mock responses
- ✅ `assets/` - Images and resources
- ✅ All pre-configured chat responses

## 🎨 Customizing Your Demo

### Adding Real Logo Examples

Replace the placeholder responses with actual logo images:

1. Add your logo images to `demo/assets/`:
   ```bash
   # Example names:
   demo/assets/demo-logo-1.png
   demo/assets/demo-logo-2.png
   demo/assets/demo-logo-3.png
   ```

2. Update the responses in `demo/app.js` to reference your images

3. Commit and push:
   ```bash
   git add demo/assets/
   git commit -m "Add demo logo examples"
   git push
   ```

4. The GitHub Action will automatically redeploy!

### Updating the Demo

Any changes you make to files in the `demo/` folder will automatically trigger a new deployment when pushed to the `main` branch.

## 🔍 Monitoring Deployment

### Check Deployment Status

1. Go to the **Actions** tab in your repository
2. You'll see the "Deploy Demo to GitHub Pages" workflow running
3. Click on it to see detailed logs
4. Green checkmark ✓ = Successfully deployed
5. Red X ✗ = Deployment failed (check logs)

### Troubleshooting

**Workflow doesn't appear?**
- Make sure you pushed the `.github/workflows/deploy-demo.yml` file
- Check the Actions tab after pushing

**Deployment fails?**
- Check the workflow logs in the Actions tab
- Verify all files in `demo/` folder are valid
- Ensure no broken links in HTML/CSS

**Page shows 404?**
- Wait 2-3 minutes after first deployment
- Verify you selected "GitHub Actions" as source in Settings → Pages
- Hard refresh your browser (Ctrl+Shift+R)

**Changes not showing up?**
- Check Actions tab to ensure deployment completed
- Hard refresh browser (Ctrl+Shift+R)
- Clear browser cache

## 📱 Sharing Your Demo

Once deployed, share your demo at:
```
https://gsshunterai.github.io/Zypher_AI/
```

Perfect for:
- 📊 Client presentations
- 💼 Portfolio showcases
- 🎓 Project demonstrations
- 🔗 Social media sharing

## 🔐 Security Notes

The demo:
- ✅ Runs entirely in the browser (static HTML/CSS/JS)
- ✅ No API keys or secrets needed
- ✅ No backend services required
- ✅ Safe to share publicly

## 🎯 Next Steps

1. **Push the workflow**: `git push` the workflow file
2. **Enable Pages**: Set source to "GitHub Actions" in Settings
3. **Trigger deployment**: Push changes or run manually
4. **Test**: Visit your demo URL
5. **Customize**: Add your logo examples
6. **Share**: Send the URL to stakeholders!

## 📚 Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/pages)
- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Demo README](demo/README.md)

---

**Repository**: https://github.com/GssHunterAI/Zypher_AI
**Demo URL**: https://gsshunterai.github.io/Zypher_AI/
**Status**: Check the Actions tab for deployment status
