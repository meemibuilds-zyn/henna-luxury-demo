// PORTFOLIO DATA. To use a real photo: copy the file into public/portfolio/
// and set image to its path, for example:  image: '/portfolio/bridal-1.jpg'
// While image is null, a clearly labeled sample placeholder is shown.

export const categories = ['Bridal', 'Arabic', 'Indo-Arabic', 'Simple', 'Kids', 'Festive']

const sample = (id, category, n, featured = false) => ({
  id,
  title: `${category} design ${n}`,
  category,
  image: null,
  alt: `Sample placeholder for a ${category.toLowerCase()} henna design`,
  caption: 'Sample placeholder. A real photo of the artist\u2019s work will replace this.',
  featured,
})

export const works = [
  sample('bridal-1', 'Bridal', 1, true),
  sample('bridal-2', 'Bridal', 2),
  sample('arabic-1', 'Arabic', 1, true),
  sample('arabic-2', 'Arabic', 2),
  sample('indo-arabic-1', 'Indo-Arabic', 1, true),
  sample('indo-arabic-2', 'Indo-Arabic', 2),
  sample('simple-1', 'Simple', 1),
  sample('simple-2', 'Simple', 2),
  sample('kids-1', 'Kids', 1),
  sample('kids-2', 'Kids', 2),
  sample('festive-1', 'Festive', 1),
  sample('festive-2', 'Festive', 2),
]

export const getWorks = (category) =>
  !category || category === 'All' ? works : works.filter((w) => w.category === category)

export const getFeaturedWorks = () => works.filter((w) => w.featured)
