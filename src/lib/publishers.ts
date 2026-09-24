/**
 * Build-time data-access helpers for publisher records.
 *
 * Queries accept an injectable database client and use deterministic ordering
 * for prerendered Astro pages and unit tests.
 */

import { asc } from 'drizzle-orm';
import type { Database } from './db';
import { publishers } from '../../db/schema';
import type { Publisher } from '../types/game';

/**
 * Retrieve all publishers ordered by name for deterministic output.
 *
 * @param db - The Drizzle database client to query.
 * @returns All publishers mapped to the application-facing `Publisher` type.
 */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    const rows = await db
        .select({
            id: publishers.id,
            name: publishers.name,
        })
        .from(publishers)
        .orderBy(asc(publishers.name));

    return rows.map((row) => ({
        id: row.id,
        name: row.name,
    }));
}
