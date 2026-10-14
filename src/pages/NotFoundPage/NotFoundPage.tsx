import { Link } from 'react-router-dom'
import { Button, Card, Container, Text, Title } from '../../ui/mantine'
import sadDogGif from '../../assets/sad-dog.gif'
import './NotFoundPage.css'

function NotFoundPage() {
  return (
    <>
      <main>
        <Container size="sm" className="not-found">
          <Card className="not-found__content">
            <section className="not-found__content">
              <div className="not-found__heading">
                <div>
                  <Title order={1} className="not-found__title">
                    Упс! Такой страницы
                    <br />
                    не существует
                  </Title>

                  <Text className="not-found__text">
                    Давайте перейдём к началу.
                  </Text>
                </div>

                <Button
                  component={Link}
                  to="/vacancies"
                  className="not-found__button"
                >
                  На главную
                </Button>
              </div>

              <img
                src={sadDogGif}
                alt="Грустная собака"
                className="not-found__image"
              />
            </section>
          </Card>
        </Container>
      </main>
    </>
  )
}

export default NotFoundPage