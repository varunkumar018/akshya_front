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
import { useEffect, useState } from 'react';
import styles from './HomePage.module.css';
import classes from './TableScrollArea.module.css';
import { Link } from 'react-router-dom';
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import { dataPost, fetchData } from './utils/crud';

const items = [
  { title: 'HomePage', href: '/homepage' },
  { title: 'Resources', href: '#' },
].map((item, index) => (
  <Link to={item.href} key={index}>
    {item.title}
  </Link>
));

export function Resource() {
  const [opened, { toggle }] = useDisclosure();
  const [scrolled, setScrolled] = useState(false);
  const [modalOpened, { open, close }] = useDisclosure(false);

  const [resourceName, setResourceName] = useState('');
  const [type, setType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unitID, setUnitID] = useState('');
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(true);
  const [resourceData, setResourceData] = useState([]); // Ensure it's an array initially
  const [unitsData, setUnitsData] = useState([]);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('jwt');
      const endpoint = 'api/resources/'; // Replace with your actual endpoint
      const body = {
        name: resourceName,
        type: type,
        quantity: quantity,
        unit: unitID,
      };

      // Debug: log the body object to verify its structure
      console.log('Request body:', body);

      const data = await dataPost(endpoint, 'POST', body, token);
      console.log('Data posted successfully:', data);
      await fetchResourceData();
      close();
    } catch (error) {
      console.error('Failed to post data:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
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

  const fetchResourceData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('jwt');
      const endpoint = 'api/resources/';
      const data = await fetchData(endpoint, 'GET', null, token);
      // Ensure data is an array
      if (Array.isArray(data)) {
        setResourceData(data);
      } else {
        console.error('Unexpected response format:', data);
        setResourceData([]);
      }
      console.log(data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUnitsData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('jwt');
      const endpoint = 'api/units/';
      const data = await fetchData(endpoint, 'GET', null, token);
      setUnitsData(data);
    } catch (error) {
      console.error('Failed to fetch units:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResourceData();
    fetchUnitsData();
  }, []);

  const rows = Array.isArray(resourceData)
    ? resourceData.map((element) => (
        <Table.Tr key={element.name}>
          <Table.Td>{element.name}</Table.Td>
          <Table.Td>{element.type}</Table.Td>
          <Table.Td>{element.quantity}</Table.Td>
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
      ))
    : null;

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
                  { value: 'Resource 1', label: 'Resource 1' },
                  { value: 'Resource 2', label: 'Resource 2' },
                  { value: 'Resource 3', label: 'Resource 3' },
                  // Add more plant options here
                ]}
                value={resourceName}
                onChange={setResourceName}
                mb="sm"
              />
              <Select
                label="Type"
                placeholder="Select Type"
                data={['Type A', 'Type B', 'Type C']} // Replace with your types
                value={type}
                onChange={setType}
                mb="sm"
              />
              <TextInput
                label="Quantity"
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(event) => setQuantity(event.currentTarget.value)}
                mb="sm"
              />
              <Select
                label="Unit"
                placeholder="Select Unit"
                data={unitsData.map((unit) => ({
                  value: unit.unit_id.toString(), // Ensure value is a string
                  label: unit.unit_name,
                }))}
                value={unitID}
                onChange={setUnitID}
                mb="sm"
              />
            </div>

            <div className={styles.buttonContainer}>
              <Button className={styles.addButtonModal} onClick={handleSubmit}>
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

function setSelectedData(data: any) {
  throw new Error('Function not implemented.');
}

function openView() {
  throw new Error('Function not implemented.');
}
