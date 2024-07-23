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
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';

const items = [
  { title: 'HomePage', href: '/homepage' },
  { title: 'Staff', href: '#' },
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

export function Staff() {
  const [opened, { toggle }] = useDisclosure();
  const [scrolled, setScrolled] = useState(false);
  const [modalOpened, { open, close }] = useDisclosure(false);

  const [staffName, setStaffName] = useState('');
  const [role, setRole] = useState('');
  const [contact, setContact] = useState('');
  const [assignUnits, setAssignUnits] = useState('');

  const handleAdd = () => {
    // Handle the add action here
    console.log('Unit Name:', staffName);
    console.log('Plant Name:', role);
    // Close the modal after adding
    close();
  };

  const handleView = (data) => {
    setSelectedData(data);
    openView();
  };

  const handleEdit = (id) => {
    console.log('Edit', id);
  };

  const handleDelete = (id) => {
    console.log('Delete', id);
  };

  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
      <Table.Td>
        <Group spacing="xs">
          <IconEye
            size={20}
            onClick={() => handleView(element.name)}
            style={{ cursor: 'pointer' }}
          />
          <IconEdit
            size={20}
            onClick={() => handleEdit(element.name)}
            style={{ cursor: 'pointer' }}
          />
          <IconTrash
            size={20}
            onClick={() => handleDelete(element.name)}
            style={{ cursor: 'pointer' }}
          />
        </Group>
      </Table.Td>
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
          <h2>Staff</h2>

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
              <TextInput
                label="Staff Name"
                placeholder="Enter staff name"
                value={staffName}
                onChange={(event) => setStaffName(event.currentTarget.value)}
                mb="sm"
              />
              <Select
                label="Role"
                placeholder="Select Role"
                data={[
                  { value: 'plant1', label: 'Plant 1' },
                  { value: 'plant2', label: 'Plant 2' },
                  { value: 'plant3', label: 'Plant 3' },
                  // Add more plant options here
                ]}
                value={role}
                onChange={setRole}
                mb="sm"
              />
              <TextInput
                label="Contact No"
                placeholder="Enter contact no"
                value={contact}
                onChange={(event) => setContact(event.currentTarget.value)}
                mb="sm"
              />
              <Select
                label="Assign Units"
                placeholder="Select Units"
                data={[
                  { value: 'plant1', label: 'Plant 1' },
                  { value: 'plant2', label: 'Plant 2' },
                  { value: 'plant3', label: 'Plant 3' },
                  // Add more plant options here
                ]}
                value={assignUnits}
                onChange={setAssignUnits}
                mb="sm"
              />
            </div>
            <div className={styles.buttonContainer}>
              <Button className={styles.addButtonModal} onClick={handleAdd}>
                Add
              </Button>
            </div>
          </Modal>

          <button className={styles.addButton} onClick={open}>
            Add Staff
          </button>
        </div>
        <Table stickyHeader stickyHeaderOffset={60}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Staff Name</Table.Th>
              <Table.Th>Role</Table.Th>
              <Table.Th>Contact no</Table.Th>
              <Table.Th>Assigned Units</Table.Th>
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
function setSelectedData(data: any) {
    throw new Error('Function not implemented.');
}

function openView() {
    throw new Error('Function not implemented.');
}