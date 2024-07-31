import { Header } from '@/components/header/header';
import { Navbar } from '@/components/navbar/navbar';
import { AppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { AreaChart } from '@mantine/charts';
import React from 'react';

export function HomePage() {
  const [opened, { toggle }] = useDisclosure();

  const data = [
    { date: '2023-01-01', Apples: 10, Oranges: 5, Tomatoes: 8 },
    { date: '2023-01-02', Apples: 15, Oranges: 7, Tomatoes: 12 },
    { date: '2023-01-03', Apples: 7, Oranges: 10, Tomatoes: 5 },
    // Add more data points as needed
  ];

  async function LiveData() {
    const url = 'https://global-electricity-production.p.rapidapi.com/year?year=2003';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'cc91ccd499msh4e1ef0cae13236dp139271jsnc24d7e6519f9',
        'x-rapidapi-host': 'global-electricity-production.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  LiveData();

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
        <h2>Area Chart</h2>
        <AreaChart
          h={550}
          w={1150}
          data={data}
          dataKey="date"
          series={[
            { name: 'Apples', color: 'indigo.6', dataKey: 'Apples' },
            { name: 'Oranges', color: 'blue.6', dataKey: 'Oranges' },
            { name: 'Tomatoes', color: 'teal.6', dataKey: 'Tomatoes' },
          ]}
          curveType="linear"
        />
      </AppShell.Main>
    </AppShell>
  );
}
