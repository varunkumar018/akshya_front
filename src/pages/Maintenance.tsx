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
  Checkbox,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import styles from './HomePage.module.css';
import classes from './TableScrollArea.module.css';
import { Link } from 'react-router-dom';
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import { dataPost, deleteData, fetchData } from './utils/crud';

const items = [
  { title: 'HomePage', href: '/homepage' },
  { title: 'Maintenance', href: '#' },
].map((item, index) => (
  <Link to={item.href} key={index}>
    {item.title}
  </Link>
));

const ViewModal = ({ opened, onClose, data }) => (
  <Modal opened={opened} onClose={onClose} centered>
    <div style={{ padding: '20px' }}>
      <div>
        <strong>Unit:</strong> {data.unit}
      </div>
      <div>
        <strong>Date:</strong> {data.date}
      </div>
      <div>
        <strong>Status:</strong> <span style={{ color: data.statusColor }}>{data.status}</span>
      </div>
      <div>
        <strong>Maintenance type:</strong> {data.type}
      </div>
      <div>
        <strong>Specification:</strong> {data.specification}
      </div>
      <div>
        <strong>Assigned To:</strong>
      </div>
      <div>Name: {data.assignedTo?.name ?? 'N/A'}</div>
      <div>Department: {data.assignedTo?.department ?? 'N/A'}</div>
      <div>Place: {data.assignedTo?.place ?? 'N/A'}</div>
      <div>
        <strong>Completed date:</strong> {data.completedDate}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button>Generate Report</Button>
      </div>
    </div>
  </Modal>
);

const AssignModal = ({ opened, onClose, data, onAssign }) => (
  <Modal opened={opened} onClose={onClose} centered>
    <div style={{ padding: '20px' }}>
      <h3>Staff List</h3>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Role</Table.Th>
            <Table.Th>Select</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((worker, index) => (
            <Table.Tr key={index}>
              <Table.Td>{worker.staff_name}</Table.Td>
              <Table.Td>{worker.role}</Table.Td>
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


export function Maintenance() {
  const [opened, { toggle }] = useDisclosure();
  const [modalOpened, { open, close }] = useDisclosure(false);
  const [viewModalOpened, { open: openView, close: closeView }] = useDisclosure(false);
  const [assignModalOpened, { open: openAssign, close: closeAssign }] = useDisclosure(false);
  const [selectedData, setSelectedData] = useState({});
  const [workersData, setWorkersData] = useState([]);

  const [specification, setSpecification] = useState('');
  const [type, setType] = useState('');
  const [mdate, setMdate] = useState(new Date());
  const [unitID, setUnitID] = useState('');

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [unitsData, setUnitsData] = useState([]);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('jwt');
      const endpoint = 'api/maintenance/'; // Replace with your actual endpoint
      const formattedDate = new Date(mdate).toISOString().split('T')[0]; // Convert to yyyy-MM-dd
      const body = {
        unit_id: unitID,
        maintenance_type: type,
        maintenance_date: formattedDate,
        record_specifications: specification,
      };

      console.log('Request body:', body);

      const data = await dataPost(endpoint, 'POST', body, token);
      console.log('Data posted successfully:', data);
      await fetchMaintenanceData();
      setUnitID('');
      setType('');
      setSpecification('');
      close();
    } catch (error) {
      console.error('Failed to post data:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (element) => {
    const viewData = {
      unit: getUnitNameById(element.unit_id),
      date: element.maintenance_date,
      status: element.status,
      statusColor: 'blue', // Adjust this based on your status logic
      type: element.maintenance_type,
      specification: element.record_specifications,
      assignedTo: element.assigned_to, // Assuming your data structure has an assigned_to field
      completedDate: element.completed_date,
    };

    setSelectedData(viewData);
    openView();
  };

  const handleEdit = (id) => {
    console.log('Edit', id);
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem('jwt');
    const endpoint = 'api/maintenance'; // Replace with your actual endpoint
    deleteData(endpoint, id, token)
      .then(() => {
        alert('Data deleted successfully');
        fetchMaintenanceData(); // Refetch the data to update the table
      })
      .catch((error) => {
        console.error('Failed to delete data:', error);
      });
  };

  const handleAssign = () => {
    console.log('Assigned workers');
    closeAssign();
  };

  const fetchMaintenanceData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('jwt');
      const endpoint = 'api/maintenance/';
      const data = await fetchData(endpoint, 'GET', null, token);
      if (Array.isArray(data)) {
        setMaintenanceData(data);
      } else {
        console.error('Unexpected response format:', data);
        setMaintenanceData([]);
      }
      console.log(data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsersData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('jwt');
      const endpoint = 'users/';
      const data = await fetchData(endpoint, 'GET', null, token);
      setWorkersData(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
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
    fetchMaintenanceData();
    fetchUnitsData();
    fetchUsersData(); // Fetch user data when the component mounts
  }, []);

  const getUnitNameById = (id) => {
    const unit = unitsData.find((unit) => unit.unit_id === id);
    return unit ? unit.unit_name : 'Unknown';
  };

  const rows = maintenanceData.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{getUnitNameById(element.unit_id)}</Table.Td>
      <Table.Td>{element.maintenance_type}</Table.Td>
      <Table.Td>{element.maintenance_date}</Table.Td>
      <Table.Td>
        <Button className={styles.button} onClick={openAssign}>
          Assign to
        </Button>
      </Table.Td>
      <Table.Td>
        <Group>
          <IconEye size={20} onClick={() => handleView(element)} style={{ cursor: 'pointer' }} />
          <IconEdit
            size={20}
            onClick={() => handleEdit(element.name)}
            style={{ cursor: 'pointer' }}
          />
          <IconTrash
            size={20}
            onClick={() => handleDelete(element.record_id)}
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
                data={unitsData.map((unit) => ({
                  value: unit.unit_id.toString(), // Ensure value is a string
                  label: unit.unit_name,
                }))}
                value={unitID}
                onChange={setUnitID}
                mb="sm"
              />
              <Select
                label="Type"
                placeholder="Select Type"
                data={['Preventive', 'Corrective', 'Condition-based','Predictive','Scheduled','Emergency','Proactive','Deferred'].map((type) => ({ value: type, label: type }))}
                value={type}
                onChange={setType}
                mb="sm"
              />
              <TextInput
                label="Date"
                type="date"
                placeholder="Pick a date"
                value={
                  mdate instanceof Date && !isNaN(mdate) ? mdate.toISOString().split('T')[0] : ''
                }
                onChange={(event) => setMdate(new Date(event.currentTarget.value))} // Update state with new Date object
                mb="sm"
              />
              <TextInput
                label="Record Specification"
                placeholder="Record Specification"
                value={specification}
                onChange={(event) => setSpecification(event.currentTarget.value)}
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
            Add Maintenance
          </button>
        </div>
        <Table stickyHeader stickyHeaderOffset={60}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Unit</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th>Assigned To</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </AppShell.Main>
      <ViewModal opened={viewModalOpened} onClose={closeView} data={selectedData} />
      <AssignModal
        opened={assignModalOpened}
        onClose={closeAssign}
        data={workersData}
        onAssign={handleAssign}
      />
    </AppShell>
  );
}
