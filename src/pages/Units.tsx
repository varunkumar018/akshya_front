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
import { dataPost, deleteData, fetchData } from './utils/crud';
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';

const items = [
  { title: 'HomePage', href: '/homepage' },
  { title: 'Settings', href: '/settings' },
  { title: 'Units', href: '#' },
].map((item, index) => (
  <Link to={item.href} key={index}>
    {item.title}
  </Link>
));

export function Units() {
  const [opened, { toggle }] = useDisclosure();
  const [scrolled, setScrolled] = useState(false);
  const [modalOpened, { open, close }] = useDisclosure(false);

  const [unitName, setUnitName] = useState('');
  const [plantName, setPlantName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unitsData, setUnitsData] = useState([]);
  const [powerplantData, setPowerPlantData] = useState([]);

  const fetchPowerPlantData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('jwt');
      const endpoint = 'api/powerplants/';
      const data = await fetchData(endpoint, 'GET', null, token);
      setPowerPlantData(data);
    } catch (error) {
      console.error('Failed to fetch power plants:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('jwt');
      const endpoint = 'api/units/';
      const body = {
        unit_name: unitName,
        power_plant: plantName,
      };

      const data = await dataPost(endpoint, 'POST', body, token);
      await fetchUnitsData();
      setUnitName('');
      setPlantName('');
      close();
    } catch (error) {
      setError(error);
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
    fetchPowerPlantData();
    fetchUnitsData();
  }, []);

  const handleView = (data) => {
    setSelectedData(data);
    openView();
  };

  const handleEdit = (id) => {
    console.log('Edit', id);
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem('jwt');
    const endpoint = 'api/units'; // Replace with your actual endpoint
    deleteData(endpoint, id, token)
      .then(() => {
        alert('Data deleted successfully');
        fetchUnitsData(); // Refetch the data to update the table
      })
      .catch((error) => {
        console.error('Failed to delete data:', error);
      });
  };

  const getPlantNameById = (id) => {
    const plant = powerplantData.find((plant) => plant.plant_id === id);
    console.log('Plant ID:', id, 'Found Plant:', plant); // Debug log
    return plant ? plant.name : 'Unknown';
  };

  const rows = unitsData.map((element) => (
    <Table.Tr key={element.unit_name}>
      <Table.Td>{element.unit_name}</Table.Td>
      <Table.Td>{getPlantNameById(element.power_plant)}</Table.Td>
      <Table.Td>
        <Group spacing="xs">
          <IconEye
            size={20}
            onClick={() => handleView(element)}
            style={{ cursor: 'pointer' }}
          />
          <IconEdit
            size={20}
            onClick={() => handleEdit(element.id)}
            style={{ cursor: 'pointer' }}
          />
          <IconTrash
            size={20}
            onClick={() => handleDelete(element.unit_id)}
            style={{ cursor: 'pointer' }}
          />
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

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
      <AppShell.Navbar p={"sm"}>
        <Navbar />
      </AppShell.Navbar>
      <AppShell.Main>
        <Breadcrumbs ml={15}>{items}</Breadcrumbs>
        <div className={styles.unitHeader}>
          <h2>Unit</h2>

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
                label="Unit Name"
                placeholder="Enter unit name"
                value={unitName}
                onChange={(event) => setUnitName(event.currentTarget.value)}
                mb="sm"
              />
              <Select
                label="Plant Name"
                placeholder="Select plant name"
                data={powerplantData.map((plant) => ({
                  value: plant.plant_id.toString(), // Ensure value is a string
                  label: plant.name,
                }))}
                value={plantName}
                onChange={setPlantName}
                mb="sm"
              />
            </div>
            <div className={styles.buttonContainer}>
              <Button className={styles.addButtonModal} onClick={handleSubmit}>
                Add
              </Button>
            </div>
          </Modal>

          <button className={styles.addButton} onClick={open}>
            Add Unit
          </button>
        </div>
        <Table stickyHeader stickyHeaderOffset={60}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Unit Name</Table.Th>
              <Table.Th>Plant Name</Table.Th>
              {/* <Table.Th>Status</Table.Th>
              <Table.Th>Last Maintenance</Table.Th> */}
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

function openView() {
  throw new Error('Function not implemented.');
}

function setSelectedData(data: any) {
  throw new Error('Function not implemented.');
}