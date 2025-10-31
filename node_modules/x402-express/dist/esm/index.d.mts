import { Request, Response, NextFunction } from 'express';
import { Address } from 'viem';
import { RoutesConfig, FacilitatorConfig } from 'x402/types';
export { Money, Network, PaymentMiddlewareConfig, Resource, RouteConfig, RoutesConfig } from 'x402/types';

/**
 * Creates a payment middleware factory for Express
 *
 * @param payTo - The Ethereum address to receive payments
 * @param routes - Configuration for protected routes and their payment requirements
 * @param facilitator - Optional configuration for the payment facilitator service
 * @returns An Express middleware handler
 *
 * @example
 * ```typescript
 * // Full configuration with specific routes
 * const middleware = paymentMiddleware({
 *   facilitator: {
 *     url: 'https://facilitator.example.com',
 *     createAuthHeaders: async () => ({
 *       verify: { "Authorization": "Bearer token" },
 *       settle: { "Authorization": "Bearer token" }
 *     })
 *   },
 *   payTo: '0x123...',
 *   routes: {
 *     '/weather/*': {
 *       price: '$0.001', // USDC amount in dollars
 *       config: {
 *         description: 'Access to weather data'
 *       }
 *     }
 *   }
 * });
 *
 * // Simple configuration with a single price for all routes
 * const middleware = paymentMiddleware({
 *   facilitator: {
 *     url: 'https://facilitator.example.com'
 *   },
 *   payTo: '0x123...',
 *   routes: {
 *     price: '$0.01',
 *     network: 'base'
 *   }
 * });
 * ```
 */
declare function paymentMiddleware(payTo: Address, routes: RoutesConfig, facilitator?: FacilitatorConfig): (req: Request, res: Response, next: NextFunction) => Promise<void>;

export { paymentMiddleware };
