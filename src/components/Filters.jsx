export default function Filters({ categories, filters, onChange }) {
  const update = (patch) => onChange({ ...filters, ...patch })

  return (
    <div className="filters">
      <input
        type="search"
        placeholder="Search products…"
        value={filters.search}
        onChange={(e) => update({ search: e.target.value })}
      />
      <select value={filters.category} onChange={(e) => update({ category: e.target.value })}>
        <option value="all">All categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <select value={filters.sort} onChange={(e) => update({ sort: e.target.value })}>
        <option value="featured">Featured</option>
        <option value="price-asc">Price: low to high</option>
        <option value="price-desc">Price: high to low</option>
        <option value="rating">Top rated</option>
      </select>
    </div>
  )
}
