# x402 Video Paywall Demo

This project demonstrates how to implement a paywall for video content using the [x402 payment protocol](https://www.x402.org/). The web app allows users to pay a small amount of cryptocurrency (USDC) to access a paywalled video.

## Features

- Simple Express.js server with x402 payment middleware
- Paywalled endpoint for accessing premium video content
- Client-side implementation for making payments
- Base Sepolia testnet integration for easy testing

## Prerequisites

- Node.js (v22 or higher)
- A EVM-compatible wallet with Base Sepolia USDC



## How It Works

1. The server uses the `x402-express` middleware to protect the `/authenticate` endpoint
2. When a user tries to access the protected endpoint, they are required to make a payment
3. After successful payment, the user is redirected to `/video-content`, where the premium video content is served


