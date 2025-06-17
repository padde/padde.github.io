# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static personal portfolio website for Patrick Oscity, hosted on GitHub Pages. The site is a simple HTML/CSS portfolio page with an animated SVG background and social media links.

## Architecture

- **Static Site**: Pure HTML/CSS with no build process or framework
- **Hosting**: GitHub Pages (configured via CNAME file pointing to www.patrickoscity.de)
- **Design**: Single-page layout with animated background using SVG filters
- **Icons**: FontAwesome SVG icons stored locally in `fa/` directory (brands, solid, duotone variants)

## File Structure

- `index.html` - Main page with personal info, contact links, and legal imprint
- `styles.css` - All styling including responsive design and hover effects
- `background.svg` - Animated SVG background with color-changing fractal noise
- `CNAME` - GitHub Pages custom domain configuration
- `fa/` - FontAwesome icon library (brands/, solid/, duotone/ subdirectories)

## Development Commands

Since this is a static site with no build process:
- **Local development**: Open `index.html` directly in browser or serve via local HTTP server
- **Deployment**: Push changes to master branch (automatically deployed via GitHub Pages)

## Content Sections

- Main profile (name, title, expertise in Ruby/Elixir)
- Call-to-action button (Brevo meeting scheduler)
- Social media icons (Email, GitHub, StackOverflow, LinkedIn, Keybase)
- Legal imprint (both English and German versions)

## Styling Notes

- Uses Inter font from Google Fonts
- Glass-morphism effect on CTA button with backdrop-filter
- Responsive icon layout with flexbox
- Fixed background with animated SVG
- Modal-style imprint overlay using CSS :target pseudo-class