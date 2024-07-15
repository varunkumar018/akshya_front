import { Header } from '@/components/header/header';
import { Navbar } from '@/components/navbar/navbar';
import {
  AppShell,
  Breadcrumbs,
  Burger,
  Button,
  Group,
  Modal,
  Select,
  Table,
  TextInput,
  Textarea,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import styles from './HomePage.module.css';
import classes from './TableScrollArea.module.css';
import { Link } from 'react-router-dom';
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';

const items = [
  { title: 'HomePage', href: '/' },
  { title: 'Maintenance', href: '#' },
].map((item, index) => (
  <Link to={item.href} key={index}>
    {item.title}
  </Link>
));

const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon', status: 'pending' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen', status: 'pending' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium', status: 'pending' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium', status: 'pending' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium', status: 'pending' },
  // ... add other elements as needed
];

const ViewModal = ({ opened, onClose, data }) => (
  <Modal opened={opened} onClose={onClose} centered>
    <div style={{ padding: '20px' }}>
      <div><strong>Unit:</strong> {data.unit}</div>
      <div><strong>Date:</strong> {data.date}</div>
      <div><strong>Status:</strong> <span style={{ color: data.statusColor }}>{data.status}</span></div>
      <div><strong>Maintenance type:</strong> {data.type}</div>
      <div><strong>Description:</strong> {data.description}</div>
      <div><strong>Assigned To:</strong></div>
      <div>Name: {data.assignedTo?.name ?? 'N/A'}</div>
      <div>Department: {data.assignedTo?.department ?? 'N/A'}</div>
      <div>Place: {data.assignedTo?.place ?? 'N/A'}</div>
      <div><strong>Completed date:</strong> {data.completedDate}</div>
      <div><strong>Comments:</strong> {data.comments}</div>
      <Button style={{ marginTop: '20px' }}>Generate Report</Button>
    </div>
  </Modal>
);

export function Maintenance() {
  const [opened, { toggle }] = useDisclosure();
  const [scrolled, setScrolled] = useState(false);
  const [modalOpened, { open, close }] = useDisclosure(false);
  const [viewModalOpened, { open: openView, close: closeView }] = useDisclosure(false);
  const [selectedData, setSelectedData] = useState({});

  const [ResourceName, setResourceName] = useState('');
  const [Type, setType] = useState('');
  const [DateValue, setDateValue] = useState(new Date());
  const [UnitID, setUnitID] = useState('');

  const handleAdd = () => {
    console.log('Resource name:', ResourceName);
    console.log('Type:', Type);
    console.log('Date:', DateValue);
    console.log('Unit ID:', UnitID);
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
      <Table.Td>{element.status}</Table.Td>
      <Table.Td>
        <Group spacing="xs">
          <IconEye
            size={20}
            onClick={() =>
              handleView({
                unit: element.name,
                date: 'DD/MM/YYYY',
                status: 'Started',
                statusColor: 'blue',
                type: 'Type name',
                description: 'Join us for an elegant evening of dining and entertainment...',
                assignedTo: { name: 'John Doe', department: 'Maintenance', place: 'Building 1' },
                completedDate: 'DD/MM/YYYY',
                comments: 'From the Worker',
              })
            }
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
          <h2>Maintenance</h2>

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
                label="Unit"
                placeholder="Select Unit"
                data={['Unit 1', 'Unit 2', 'Unit 3']} // Replace with your units
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
                label="Date"
                type="date"
                placeholder="Pick a date"
                value={DateValue}
                onChange={setDateValue}
                mb="sm"
              />
              <TextInput
                label="Record Specification"
                placeholder="Record Specification"
                value={UnitID}
                onChange={(event) => setUnitID(event.currentTarget.value)}
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
            Add Maintenance
          </button>
        </div>
        <Table stickyHeader stickyHeaderOffset={60}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Unit</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th>Assign to</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
          <Table.Caption>Scroll page to see sticky thead</Table.Caption>
        </Table>
      </AppShell.Main>
      <ViewModal opened={viewModalOpened} onClose={closeView} data={selectedData} />
    </AppShell>
  );
}
