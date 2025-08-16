# CI/CD Pipeline Documentation

This document explains the Continuous Integration and Continuous Deployment (CI/CD) pipeline setup for the Weather App using GitHub Actions.

## Overview

The CI/CD pipeline consists of multiple workflows that automate testing, building, security scanning, and deployment processes.

## Workflows

### 1. Main CI/CD Pipeline (`ci-cd.yml`)

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` branch

**Jobs:**
1. **Test and Lint** - Runs TypeScript checks, ESLint, and builds the application
2. **Docker Build** - Builds and pushes Docker images to GitHub Container Registry
3. **Security Scan** - Runs npm audit and Trivy security scanning
4. **Deploy to GitHub Pages** - Deploys the application to GitHub Pages (main branch only)
5. **Notification** - Sends deployment status notifications

### 2. Pull Request Validation (`pr-validation.yml`)

**Triggers:**
- Pull request opened, synchronized, or reopened

**Jobs:**
1. **Validate PR** - Full validation including Docker build testing
2. **Lighthouse Audit** - Performance and accessibility testing

### 3. Dependency Updates (`dependency-update.yml`)

**Triggers:**
- Weekly schedule (Mondays at 9 AM UTC)
- Manual trigger

**Jobs:**
1. **Update Dependencies** - Automatically updates npm dependencies and creates PR

### 4. Release Workflow (`release.yml`)

**Triggers:**
- Git tags starting with `v*` (e.g., `v1.0.0`)

**Jobs:**
1. **Create Release** - Creates GitHub release with artifacts and Docker images

## Setup Instructions

### 1. Repository Setup

1. **Enable GitHub Pages:**
   - Go to Settings → Pages
   - Source: GitHub Actions
   - This allows the deployment to GitHub Pages

2. **Enable GitHub Packages:**
   - The workflow automatically uses GitHub Container Registry
   - No additional setup required

### 2. Required Permissions

The workflows use the default `GITHUB_TOKEN` with these permissions:
- `contents: write` - For creating releases
- `packages: write` - For pushing Docker images
- `pages: write` - For GitHub Pages deployment
- `id-token: write` - For GitHub Pages

### 3. Optional Secrets

All workflows use the default `GITHUB_TOKEN`. For additional features, you can add:

- `SLACK_WEBHOOK_URL` - For Slack notifications
- `DISCORD_WEBHOOK_URL` - For Discord notifications
- Custom deployment tokens if deploying to external services

## Usage

### Running Workflows

1. **Automatic Triggers:**
   - Push code to `main` or `develop` → Full CI/CD pipeline runs
   - Create PR → Validation and testing workflows run
   - Push git tag `v*` → Release workflow runs

2. **Manual Triggers:**
   - Go to Actions tab → Select workflow → "Run workflow"

### Creating Releases

To create a new release:

```bash
# Tag the commit
git tag v1.0.0
git push origin v1.0.0
```

This will trigger the release workflow which:
- Builds the application
- Creates GitHub release
- Builds and pushes Docker images
- Generates release notes

### Docker Images

Images are pushed to GitHub Container Registry:
```bash
# Pull the latest image
docker pull ghcr.io/yourusername/weather:latest

# Pull specific version
docker pull ghcr.io/yourusername/weather:v1.0.0

# Run the container
docker run -p 3000:80 ghcr.io/yourusername/weather:latest
```

## Workflow Status Badges

Add these badges to your README.md:

```markdown
[![CI/CD Pipeline](https://github.com/yourusername/weather/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/yourusername/weather/actions/workflows/ci-cd.yml)
[![Security Scan](https://github.com/yourusername/weather/actions/workflows/ci-cd.yml/badge.svg?event=push&job=security)](https://github.com/yourusername/weather/actions/workflows/ci-cd.yml)
```

## Security Features

1. **Dependency Scanning:** npm audit checks for known vulnerabilities
2. **Container Scanning:** Trivy scans Docker images for security issues
3. **SARIF Reports:** Security findings are uploaded to GitHub Security tab
4. **Automated Updates:** Weekly dependency updates with automated testing

## Performance Monitoring

- **Lighthouse CI:** Runs performance audits on pull requests
- **Bundle Size Tracking:** Reports bundle size changes in PR comments
- **Build Time Monitoring:** Tracks build performance across runs

## Troubleshooting

### Common Issues

1. **Docker Build Fails:**
   - Check Dockerfile syntax
   - Ensure all dependencies are properly specified
   - Review build logs in Actions tab

2. **Tests Fail:**
   - Check TypeScript compilation errors
   - Review ESLint issues
   - Ensure all dependencies are installed

3. **Deployment Fails:**
   - Verify GitHub Pages is enabled
   - Check repository permissions
   - Review deployment logs

4. **Security Scan Issues:**
   - Update vulnerable dependencies
   - Review npm audit report
   - Check Trivy scan results in Security tab

### Getting Help

1. Check the Actions tab for detailed logs
2. Review the Security tab for vulnerability reports
3. Check Issues tab for known problems
4. Review this documentation for setup requirements

## Customization

### Adding New Workflows

1. Create new `.yml` file in `.github/workflows/`
2. Define triggers and jobs
3. Test with a pull request

### Modifying Existing Workflows

1. Edit the workflow file
2. Test changes with pull request
3. Monitor the Actions tab for results

### Adding Notifications

Example Slack notification step:
```yaml
- name: Notify Slack
  if: always()
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK_URL }}
```

## Best Practices

1. **Branch Protection:** Enable branch protection rules for `main`
2. **Required Checks:** Make CI checks required for PR merging
3. **Security Updates:** Enable Dependabot for automated security updates
4. **Monitoring:** Regularly review workflow runs and security reports
5. **Documentation:** Keep this documentation updated with changes
