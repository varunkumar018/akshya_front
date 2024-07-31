import { Header } from '@/components/header/header';
import { Navbar } from '@/components/navbar/navbar';
import { AppShell, Burger, Group, Grid, Card, Breadcrumbs, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';

const items = [
  { title: 'HomePage', href: '/homepage' },
  { title: 'Settings', href: '#' },
].map((item, index) => (
  <Link to={item.href} key={index}>
    {item.title}
  </Link>
));

export function Settings() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Header />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <Navbar />
      </AppShell.Navbar>
      <AppShell.Main>
        <Breadcrumbs ml={15}>{items}</Breadcrumbs>
        <h2>Settings</h2>
        <Grid w="80rem">
          <Grid.Col span={4} pl="20px">
            <Link to="/powerplant" style={{ textDecoration: 'none' }}>
              <Card
                shadow="sm"
                w="280px"
                padding="xl"
                h="100px"
                radius="md"
                mt="30px"
                ml="80px"
                mr="900px"
                withBorder
              >
                <Text>Power Plant</Text>
              </Card>
            </Link>
          </Grid.Col>

          <Grid.Col span={4} pl="20px">
            <Link to="/units" style={{ textDecoration: 'none' }}>
              <Card
                shadow="sm"
                w="280px"
                padding="xl"
                h="100px"
                radius="md"
                mt="30px"
                ml="30px"
                mr="900px"
                withBorder
              >
                <Text>Units</Text>
              </Card>
            </Link>
          </Grid.Col>

          <Grid.Col span={4}>
            <Link to="/staff" style={{ textDecoration: 'none' }}>
              <Card
                shadow="sm"
                w="280px"
                padding="xl"
                h="100px"
                radius="md"
                mt="30px"
                ml="15px"
                mr="900px"
                withBorder
              >
                <Text>Staff</Text>
              </Card>
            </Link>
          </Grid.Col>
        </Grid>
      </AppShell.Main>
    </AppShell>
  );
}
