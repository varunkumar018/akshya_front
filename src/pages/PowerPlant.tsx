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
import { dataPost, deleteData, fetchData} from './utils/crud';

const items = [
  { title: 'HomePage', href: '/homepage' },
  { title: 'Settings', href: '/settings' },
  { title: 'Power Plant', href: '#' },
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

export function PowerPlant() {
  const [opened, { toggle }] = useDisclosure();
  const [scrolled, setScrolled] = useState(false);
  const [modalOpened, { open, close }] = useDisclosure(false);

  const [plantName, setPlantName] = useState('');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState('');
  const [energyType, setEnergyType] = useState('');

  const [error, setError] = useState(null);

  const click = () => {
    alert('Clicked');
  };
  const [loading, setLoading] = useState(true);
  const [powerplantData, setPowerPlantData] = useState([]);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('jwt');
      const endpoint = 'api/powerplants/'; // Replace with your actual endpoint
      const body = {
        name: plantName,
        location: location,
        capacity: capacity,
        type_of_energy: energyType,
      };

      // Debug: log the body object to verify its structure
      console.log('Request body:', body);

      const data = await dataPost(endpoint, 'POST', body, token);
      console.log('Data posted successfully:', data);
      await fetchPowerPlantData();
      setPlantName('');
      setLocation('');
      setCapacity('');
      setEnergyType('');
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
    const token = localStorage.getItem('jwt');
    const endpoint = 'api/powerplants'; // Replace with your actual endpoint
    deleteData(endpoint, id, token)
      .then(() => {
        alert('Data deleted successfully');
        fetchPowerPlantData(); // Refetch the data to update the table
      })
      .catch((error) => {
        console.error('Failed to delete data:', error);
      });
  };

  const fetchPowerPlantData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('jwt');
      const endpoint = 'api/powerplants/';
      const data = await fetchData(endpoint, 'GET', null, token);
      setPowerPlantData(data);

      console.log(data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPowerPlantData();
  }, []);

  const rows = powerplantData.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.location}</Table.Td>
      <Table.Td>{element.capacity}</Table.Td>
      <Table.Td>{element.type_of_energy}</Table.Td>
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
            onClick={() => handleDelete(element.plant_id)}
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
          <h2>Power Plant</h2>

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
                label="Plant Name"
                placeholder="Name"
                value={plantName}
                onChange={(event) => setPlantName(event.currentTarget.value)}
                mb="sm"
              />

              <TextInput
                label="Capacity"
                type="number"
                placeholder="Capacity"
                value={capacity}
                onChange={(event) => setCapacity(event.currentTarget.value)}
                mb="sm"
              />

              <Select
                label="Location"
                placeholder="Select Location"
                data={[
                  { value: 'location1', label: 'Location 1' },
                  { value: 'location2', label: 'Location 2' },
                  { value: 'location3', label: 'Location 3' },
                ]}
                value={location}
                onChange={setLocation}
                mb="sm"
              />

              <Select
                label="Type of Energy"
                placeholder="Select Type of Energy"
                data={[
                  { value: 'solar', label: 'Solar' },
                  { value: 'wind', label: 'Wind' },
                  { value: 'hydro', label: 'Hydro' },
                ]}
                value={energyType}
                onChange={setEnergyType}
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
            Add Plant
          </button>
        </div>
        <Table stickyHeader stickyHeaderOffset={60}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Plant Name</Table.Th>
              <Table.Th>Location</Table.Th>
              <Table.Th>Capacity</Table.Th>
              <Table.Th>Type of Energy</Table.Th>
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
