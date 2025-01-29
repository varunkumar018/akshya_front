import { Header } from '@/components/header/header';
import { Navbar } from '@/components/navbar/navbar';
import { AppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { AreaChart } from '@mantine/charts';
import React from 'react';

export function HomePage() {
  const [opened, { toggle }] = useDisclosure();

  const data = [
    { date: '2023-01-01', Solar: 100, Wind: 80, Hydro: 50, Geothermal: 30, Biomass: 20 },
    { date: '2023-01-02', Solar: 120, Wind: 90, Hydro: 70, Geothermal: 40, Biomass: 25 },
    { date: '2023-01-03', Solar: 90, Wind: 110, Hydro: 60, Geothermal: 35, Biomass: 30 },
    { date: '2023-01-04', Solar: 150, Wind: 130, Hydro: 80, Geothermal: 50, Biomass: 40 },
    { date: '2023-01-05', Solar: 130, Wind: 120, Hydro: 90, Geothermal: 45, Biomass: 35 },
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
      navbar={{ width: 275, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Header />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p={'sm'}>
        <Navbar />
      </AppShell.Navbar>
      <AppShell.Main>
        <h2>Analysis</h2>
        <AreaChart
          h={550}
          w={1150}
          data={data}
          dataKey="date"
          series={[
            { name: 'Solar', color: 'yellow.6', dataKey: 'Solar' },
            { name: 'Wind', color: 'blue.6', dataKey: 'Wind' },
            { name: 'Hydro', color: 'green.6', dataKey: 'Hydro' },
            { name: 'Geothermal', color: 'orange.6', dataKey: 'Geothermal' },
            { name: 'Biomass', color: 'brown.6', dataKey: 'Biomass' },
          ]}
          curveType="linear"
        />
      </AppShell.Main>
    </AppShell>
  );
}
