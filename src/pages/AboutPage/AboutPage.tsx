import { Card, Container, Text, Title } from '../../ui/mantine'
import './AboutPage.css'

function AboutPage() {
  return (
    <main className="about-page">
      <Container size="lg">
        <Card className="about-page__card">
          <Title order={1} className="about-page__title">
            Иван Тугусов
          </Title>

          <Text className="about-page__text">
            Привет! Я - Frontend-разработчик. Пишу приложения на React +
            TypeScript + Redux Toolkit.
            Весь стек:
              base:
                HTML5, CSS3/SCSS/SASS, JS, TS;
              framewokr/libraries:
                React, Redux/RTK, Next.js(in progress);
                  ui:
                    Mantine;
                  test:
                    vitest,RTS;
              bild tools:
                Vite, Webpack;
          </Text>
        </Card>
      </Container>
    </main>
  )
}

export default AboutPage