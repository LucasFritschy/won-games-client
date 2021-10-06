import Home, { HomeTemplateProps } from 'templates/Home'
import gamesMock from 'components/GameCardSlider/mock'
import highlightMock from 'components/Highlight/mock'
import { initializeApollo } from 'utils/apollo'
import { QueryHome } from 'graphql/generated/QueryHome'
import { QUERY_HOME } from 'graphql/queries/home'

export default function Index(props: HomeTemplateProps) {
  return <Home {...props} />
}

// ATENÇÃO:
// os métodos getStaticProps/getServerSideProps SÓ FUNCIONAM EM PAGES

// getStaticProps => gerar estático em build time (gatsby)
// getServerSideProps => gerar via ssr a cada request (nunca vai para o bundle do client)
// getInitialProps => gerar via ssr a cada request (vai para o client, faz hydrate do lado do client depois do 1 req)
export async function getStaticProps() {
  const apolloClient = initializeApollo()

  const {
    data: { banners, newGames, upcomingGames, freeGames, sections }
  } = await apolloClient.query<QueryHome>({ query: QUERY_HOME })

  return {
    props: {
      revalidate: 10,
      banners: banners.map((banner) => ({
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
      })),
      newGamesTitle: sections?.newGames?.title,
      newGames: newGames.map((game) => ({
        title: game.name,
        slug: game.slug,
        developer: game.developers[0].name,
        img: game.cover?.url || null,
        price: game.price
      })),
      mostPopularGamesTitle: sections?.popularGames?.title,
      mostPopularHighlight: {
        title: sections?.popularGames!.highlight!.title,
        subtitle: sections?.popularGames!.highlight!.subtitle,
        backgroundImage: sections?.popularGames!.highlight!.background?.url,
        buttonLabel: sections?.popularGames!.highlight!.buttonLabel,
        buttonLink: sections?.popularGames!.highlight!.buttonLink,
        floatImage: sections?.popularGames!.highlight!.floatImage?.url,
        alignment: sections?.popularGames!.highlight!.alignment
      },
      mostPopularGames: sections!.popularGames!.games.map((game) => ({
        title: game.name,
        slug: game.slug,
        developer: game.developers[0].name,
        img: game.cover?.url || null,
        price: game.price
      })),
      upcomingGamesTitle: sections?.upcomingGames?.title,
      upcomingGames: upcomingGames.map((game) => ({
        title: game.name,
        slug: game.slug,
        developer: game.developers[0].name,
        img: game.cover?.url || null,
        price: game.price
      })),
      upcomingHighlight: {
        title: sections?.upcomingGames!.highlight!.title,
        subtitle: sections?.upcomingGames!.highlight!.subtitle,
        backgroundImage: sections?.upcomingGames!.highlight!.background?.url,
        buttonLabel: sections?.upcomingGames!.highlight!.buttonLabel,
        buttonLink: sections?.upcomingGames!.highlight!.buttonLink,
        floatImage: sections?.upcomingGames!.highlight!.floatImage?.url,
        alignment: sections?.upcomingGames!.highlight!.alignment
      },

      freeGamesTitle: sections?.freeGames?.title,
      freeGames: freeGames.map((game) => ({
        title: game.name,
        slug: game.slug,
        developer: game.developers[0].name,
        img: game.cover?.url || null,
        price: game.price
      })),
      freeHighlight: {
        title: sections?.freeGames!.highlight!.title,
        subtitle: sections?.freeGames!.highlight!.subtitle,
        backgroundImage: sections?.freeGames!.highlight!.background?.url,
        buttonLabel: sections?.freeGames!.highlight!.buttonLabel,
        buttonLink: sections?.freeGames!.highlight!.buttonLink,
        floatImage: sections?.freeGames!.highlight!.floatImage?.url,
        alignment: sections?.freeGames!.highlight!.alignment
      }
    }
  }
}
