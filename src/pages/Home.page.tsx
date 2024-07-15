import { Header } from '@/components/header/header';
import { Navbar } from '@/components/navbar/navbar';
import { AppShell, Burger, Group, ScrollArea, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export function HomePage() {
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
      <AppShell.Main>main</AppShell.Main>
    </AppShell>
  );
}
