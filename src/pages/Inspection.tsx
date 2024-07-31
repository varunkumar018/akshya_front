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
import { useEffect, useState } from 'react';
import styles from './HomePage.module.css';
import classes from './TableScrollArea.module.css';
import { Link } from 'react-router-dom';
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import { dataPost, fetchData } from './utils/crud';

const items = [
  { title: 'HomePage', href: '/homepage' },
  { title: 'Inspection', href: '#' },
].map((item, index) => (
  <Link to={item.href} key={index}>
    {item.title}
  </Link>
));

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
  const [unitID, setUnitID] = useState('');
  const [idate, setIdate] = useState('');

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inspectionData, setInspectionData] = useState([]);
  const [unitsData, setUnitsData] = useState([]);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('jwt');
      const endpoint = 'api/inspections/'; // Replace with your actual endpoint
      const formattedDate = new Date(idate).toISOString().split('T')[0]; // Convert to yyyy-MM-dd
      const body = {
        unit_id: unitID,
        inspection_date: formattedDate,
      };

      // Debug: log the body object to verify its structure
      console.log('Request body:', body);

      const data = await dataPost(endpoint, 'POST', body, token);
      console.log('Data posted successfully:', data);
      await fetchInspectionData();
      close();
    } catch (error) {
      console.error('Failed to post data:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (data) => {
    const unitName = getUnitNameById(data.unit_id);
    setSelectedData({
      ...data,
      unit: unitName,
      date: data.inspection_date,
      statusColor: data.status === 'Completed' ? 'green' : 'blue',
      setComments: (comments) => {
        setSelectedData((prevData) => ({
          ...prevData,
          comments,
        }));
      },
    });
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

  const fetchInspectionData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('jwt');
      const endpoint = 'api/inspections/';
      const data = await fetchData(endpoint, 'GET', null, token);
      // Ensure data is an array
      if (Array.isArray(data)) {
        setInspectionData(data);
      } else {
        console.error('Unexpected response format:', data);
        setInspectionData([]);
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
    fetchInspectionData();
    fetchUnitsData();
  }, []);

  const getUnitNameById = (id) => {
    const unit = unitsData.find((unit) => unit.unit_id === id);
    return unit ? unit.unit_name : 'Unknown';
  };

  const rows = inspectionData.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{getUnitNameById(element.unit_id)}</Table.Td>
      <Table.Td>{element.inspection_date}</Table.Td>
      <Table.Td><Button className={styles.button} onClick={openAssign}>Assign to</Button></Table.Td>
      <Table.Td>{element.status}</Table.Td>
      <Table.Td>
        <Group>
          <IconEye
            size={20}
            onClick={() => handleView(element)}
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
                data={unitsData.map((unit) => ({
                  value: unit.unit_id.toString(), // Ensure value is a string
                  label: unit.unit_name,
                }))}
                value={unitID}
                onChange={setUnitID}
                mb="sm"
              />
              <TextInput
                label="Inspection Date"
                type="date"
                placeholder="Pick a date"
                value={
                  idate instanceof Date && !isNaN(idate) ? idate.toISOString().split('T')[0] : ''
                }
                onChange={(event) => setIdate(new Date(event.currentTarget.value))} // Update state with new Date object
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
            Add Inspection
          </button>
        </div>
        <Table stickyHeader stickyHeaderOffset={60}>
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
