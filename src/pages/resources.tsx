import { Header } from '@/components/header/header';
import { Navbar } from '@/components/navbar/navbar';
import {
  AppShell,
  Breadcrumbs,
  Burger,
  Button,
  Group,
  Modal,
  Table,
  TextInput,
  Select,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import styles from './HomePage.module.css';
import classes from './TableScrollArea.module.css';
import { Link } from 'react-router-dom';

const items = [
  { title: 'HomePage', href: '/' },
  { title: 'Resources', href: '#' },
].map((item, index) => (
  <Link to={item.href} key={index}>
    {item.title}
  </Link>
));

const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
  // ... add other elements as needed
];

export function Resource() {
  const [opened, { toggle }] = useDisclosure();
  const [scrolled, setScrolled] = useState(false);
  const [modalOpened, { open, close }] = useDisclosure(false);

  const [ResourceName, setResourceName] = useState('');
  const [Type, setType] = useState('');
  const [Quantity, setQuantity] = useState('');
  const [UnitID, setUnitID] = useState('');

  const handleAdd = () => {
    console.log('Resource name:', ResourceName);
    console.log('Type:', Type);
    console.log('Quantity:', Quantity);
    console.log('Unit ID:', UnitID);
    close();
  };

  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
    </Table.Tr>
  ));

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
        <div className={styles.unitHeader}>
          <h2>Resource</h2>

          <Modal
            opened={modalOpened}
            onClose={close}
            overlayProps={{
              backgroundOpacity: 0.55,
              blur: 3,
            }}
            centered
          >
            <div className={styles.gridContainer}>
              <Select
                label="Resource Name"
                placeholder="Select Resource name"
                data={[
                  { value: 'plant1', label: 'Resource 1' },
                  { value: 'plant2', label: 'Resource 2' },
                  { value: 'plant3', label: 'Resource 3' },
                  // Add more plant options here
                ]}
                value={ResourceName}
                onChange={setResourceName}
                mb="sm"
              />
              <Select
                label="Type"
                placeholder="Select Type"
                data={['Type A', 'Type B', 'Type C']} // Replace with your types
                value={Type}
                onChange={setType}
                mb="sm"
              />
              <TextInput
                label="Quantity"
                type="number"
                placeholder="Quantity"
                value={Quantity}
                onChange={(event) => setQuantity(event.currentTarget.value)}
                mb="sm"
              />
              <Select
                label="Unit"
                placeholder="Select Unit"
                data={[
                  { value: 'plant1', label: 'Resource 1' },
                  { value: 'plant2', label: 'Resource 2' },
                  { value: 'plant3', label: 'Resource 3' },
                  // Add more plant options here
                ]}
                value={UnitID}
                onChange={setUnitID}
                mb="sm"
              />
            </div>

            <div className={styles.buttonContainer}>
              <Button className={styles.addButtonModal} onClick={handleAdd}>
                Add Resource
              </Button>
            </div>
          </Modal>

          <button className={styles.addButton} onClick={open}>
            Add Resource
          </button>
        </div>
        <Table stickyHeader stickyHeaderOffset={60}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Quantity</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
          <Table.Caption>Scroll page to see sticky thead</Table.Caption>
        </Table>
      </AppShell.Main>
    </AppShell>
  );
}
