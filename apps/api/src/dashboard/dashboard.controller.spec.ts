import { DashboardController } from './dashboard.controller';

describe('DashboardController', () => {
  const controller = new DashboardController();

  it('returns a summary payload the dashboard can render', () => {
    const summary = controller.getSummary();

    expect(typeof summary.generatedAt).toBe('string');
    expect(Number.isNaN(Date.parse(summary.generatedAt))).toBe(false);
    expect(summary.cards.length).toBeGreaterThan(0);

    for (const card of summary.cards) {
      expect(typeof card.key).toBe('string');
      expect(typeof card.label).toBe('string');
      expect(typeof card.value).toBe('number');
      expect(Number.isNaN(card.value)).toBe(false);
      expect(typeof card.trend).toBe('string');
    }
  });
});
