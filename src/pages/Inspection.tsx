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
  Checkbox,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import styles from './HomePage.module.css';
import classes from './TableScrollArea.module.css';
import { Link } from 'react-router-dom';
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';

const items = [
  { title: 'HomePage', href: '/homepage' },
  { title: 'Inspection', href: '#' },
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
      <div><strong>Inspection Details:</strong> {data.inspectionDetails}</div>
      <div><strong>Comments:</strong></div>
      <Textarea value={data.comments} onChange={(event) => data.setComments(event.currentTarget.value)} />
      <div><strong>Completed date:</strong> {data.completedDate}</div>
      <div><strong>Inspected By:</strong> {data.inspectedBy}</div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button>Generate Report</Button>
      </div>
    </div>
  </Modal>
);

const AssignModal = ({ opened, onClose, data, onAssign }) => (
  <Modal opened={opened} onClose={onClose} centered>
    <div style={{ padding: '20px' }}>
      <h3>Unit Wise Workers List</h3>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Department</Table.Th>
            <Table.Th>Select</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((worker, index) => (
            <Table.Tr key={index}>
              <Table.Td>{worker.name}</Table.Td>
              <Table.Td>{worker.department}</Table.Td>
              <Table.Td>
                <Checkbox />
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <Button onClick={onAssign} style={{ display: 'block', margin: '20px auto', backgroundColor: 'black' }}>Assign</Button>
    </div>
  </Modal>
);

export function Inspection() {
  const [opened, { toggle }] = useDisclosure();
  const [scrolled, setScrolled] = useState(false);
  const [modalOpened, { open, close }] = useDisclosure(false);
  const [viewModalOpened, { open: openView, close: closeView }] = useDisclosure(false);
  const [assignModalOpened, { open: openAssign, close: closeAssign }] = useDisclosure(false);
  const [selectedData, setSelectedData] = useState({});
  const [workersData, setWorkersData] = useState([
    { name: 'AAAAA', department: 'manage' },
    { name: 'BBBBB', department: 'As.Manager' },
    { name: 'CCCCC', department: 'Inspector' },
    { name: 'DDDDD', department: 'manage' },
    // Add more workers as needed
  ]);

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

  const handleAssign = () => {
    console.log('Assigned workers');
    closeAssign();
  };

  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td><Button className={styles.button} onClick={openAssign}>Assign to</Button></Table.Td>
      <Table.Td>{element.status}</Table.Td>
      <Table.Td>
        <Group >
          <IconEye
            size={20}
            onClick={() =>
              handleView({
                unit: element.name,
                date: 'DD/MM/YYYY',
                status: 'Started',
                statusColor: 'blue',
                completedDate: 'DD/MM/YYYY',
                inspectionDetails: 'Details of the inspection...',
                comments: '',
                setComments: (comments) => {
                  setSelectedData((prevData) => ({
                    ...prevData,
                    comments,
                  }));
                },
                inspectedBy: 'Person Details',
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
          <h2>Inspection</h2>

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
              <TextInput
                label="Inspection Date"
                type="date"
                placeholder="Pick a date"
                value={DateValue}
                onChange={setDateValue}
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
            Add Inspection
          </button>
        </div>
        <Table stickyHeader stickyHeaderOffset={60} >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Unit</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th>Assigned To</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
          <Table.Caption>Scroll page to see sticky thead</Table.Caption>
        </Table>
      </AppShell.Main>
      <ViewModal opened={viewModalOpened} onClose={closeView} data={selectedData} />
      <AssignModal opened={assignModalOpened} onClose={closeAssign} data={workersData} onAssign={handleAssign} />
    </AppShell>
  );
}
