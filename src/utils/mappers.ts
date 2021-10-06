import { QueryHome_banners } from 'graphql/generated/QueryHome'
import { QueryGames_games } from 'graphql/generated/QueryGames'
import { HighlightFragment } from 'graphql/generated/HighlightFragment'

export const bannerMapper = (banners: QueryHome_banners[]) => {
  const mappedBanners = banners.map((banner) => ({
    img: banner.image?.url || null,
    title: banner.title,
    subtitle: banner.subtitle,
    buttonLabel: banner.button?.label,
    buttonLink: banner.button?.link,
    ...(banner.ribbon && {
      ribbon: banner.ribbon.text,
      ribbonColor: banner.ribbon.color,
      ribbonSize: banner.ribbon.size
    })
  }))

  return mappedBanners
}

export const gamesMapper = (games: QueryGames_games[] | null | undefined) => {
  if (games) {
    const mappedGames = games.map((game) => ({
      title: game.name,
      slug: game.slug,
      developer: game.developers[0].name,
      img: game.cover?.url || null,
      price: game.price
    }))

    return mappedGames
  }
}

export const highlightMapper = (
  highlight: HighlightFragment | null | undefined
) => {
  if (highlight) {
    const mappedHighlight = {
      title: highlight.title,
      subtitle: highlight.subtitle,
      backgroundImage: highlight.background?.url,
      buttonLabel: highlight.buttonLabel,
      buttonLink: highlight.buttonLink,
      floatImage: highlight.floatImage?.url,
      alignment: highlight.alignment
    }
    return mappedHighlight
  }
}
