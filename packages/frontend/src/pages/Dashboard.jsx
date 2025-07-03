import { capitalize, isEmpty, toUpper } from 'lodash';
import {
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
  CalendarDays,
  File,
  SlidersHorizontal,
} from 'lucide-react';
import { useState } from 'react';
import { formatDate } from '../common/util';
import SearchInput from '../components/search-input';
import Button from '../components/ui/button';
import Checkbox from '../components/ui/checkbox';
import Hr from '../components/ui/hr';
import Popover from '../components/ui/popover';
import Tooltip from '../components/ui/tooltip';
import useRoomingListsHook from '../hooks/useRoomingListsHook';
import { getAllBookingsByRoomingListId } from '../services/booking';
import { importJsonFiles } from '../services/import';
import { useDebounce } from 'use-debounce';

function Dashboard() {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);

  const [sortOrder, setSortOrder] = useState('asc');

  const [auxStatuses, setAuxStatuses] = useState([]);
  const [status, setStatus] = useState([]);

  const { events, roomingListGroupByEvent, refetch } = useRoomingListsHook({
    search: debouncedSearch,
    status,
    sortBy: 'cut_off_date',
    sortOrder,
  });

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleChangeStatus = (e) => {
    const value = e.target.value;
    setAuxStatuses((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleSaveStatus = () => {
    setStatus(auxStatuses);
    setSortOrder('asc');
  };

  const handleSortToggle = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const fetchBookingsByRoomingListId = async ({ roomingListId }) => {
    try {
      const bookings = await getAllBookingsByRoomingListId({
        roomingListId: roomingListId,
      });
      console.log('Bookings for rooming list:', bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      return [];
    }
  };

  const submitImportJsonFiles = async () => {
    try {
      await importJsonFiles();
      refetch();
    } catch (error) {
      console.error('Error importing JSON files:', error);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-between mb-8 gap-1">
        <h1 className="text-3xl font-bold">Rooming List Management: Events</h1>
        <a
          className="text-sm cursor-pointer text-indigo-600 hover:text-indigo-500"
          onClick={submitImportJsonFiles}
        >
          Insert Bookings and Rooming Lists
        </a>
      </div>
      <div className="flex flex-col items-center mb-6 gap-4 md:flex-row">
        <SearchInput
          className="w-full flex-none md:w-auto"
          label="Search"
          value={search}
          onChange={handleSearchChange}
        />
        <Popover
          className="w-full flex-none md:w-auto"
          trigger={
            <Button
              variant="ghost"
              rightIcon={
                <SlidersHorizontal className="w-5 h-5 text-green-500" />
              }
            >
              Filters
            </Button>
          }
        >
          <div className="flex flex-col gap-2">
            <span className="text-gray-500">RFP Status</span>
            <Checkbox
              label="Active"
              value="received"
              checked={auxStatuses.includes('received')}
              onChange={handleChangeStatus}
            />
            <Checkbox
              label="Closed"
              value="completed"
              checked={auxStatuses.includes('completed')}
              onChange={handleChangeStatus}
            />
            <Checkbox
              label="Cancelled"
              value="archived"
              checked={auxStatuses.includes('archived')}
              onChange={handleChangeStatus}
            />
            <Button
              variant="primary"
              className="mt-2"
              onClick={handleSaveStatus}
            >
              Save
            </Button>
          </div>
        </Popover>
        <Button
          className="w-full flex-none md:w-auto"
          variant="ghost"
          rightIcon={
            sortOrder === 'asc' ? (
              <ArrowUpWideNarrow className="w-5 h-5 text-green-500" />
            ) : (
              <ArrowDownWideNarrow className="w-5 h-5 text-green-500" />
            )
          }
          onClick={handleSortToggle}
        >
          Cut Off Date{' '}
        </Button>
      </div>
      {isEmpty(roomingListGroupByEvent) && (
        <div className="text-gray-500 text-center">No rooming lists found.</div>
      )}
      {!isEmpty(events) &&
        events.map((eventName, i) => (
          <div key={`${eventName}-event-${i}`} className="mb-6">
            <Hr className="mb-4" color={i % 2 === 0 ? 'teal' : 'indigo'}>
              {eventName}
            </Hr>
            <div className="w-full overflow-x-auto pb-2">
              <div className="flex gap-4 min-w-full">
                {roomingListGroupByEvent[eventName].map((roomingList) => (
                  <div
                    key={roomingList.rooming_list_id}
                    className="bg-white basis-3/10 rounded-2xl shadow border border-gray-100 p-4 flex-shrink-0 'hover:shadow-lg transition-shadow duration-200'"
                  >
                    <div className="flex flex-col-reverse gap-2 justify-between md:flex-row">
                      <div>
                        <div className="font-bold text-lg mb-1">
                          {roomingList.rfp_name}
                        </div>
                        <div className="mb-2 flex gap-1 flex-col md:flex-row">
                          <span>Agreement: </span>
                          <span className="font-semibold">
                            {capitalize(roomingList.agreement_type)}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="height-6 w-14">
                          <div className="rounded-t bg-blue-200 text-center font-semibold text-md text-blue-500">
                            {toUpper(
                              formatDate({
                                dateString: roomingList.cut_off_date,
                                options: { month: 'short' },
                              })
                            )}
                          </div>
                          <div className="rounded-b bg-blue-100 text-center font-bold text-2xl text-blue-500">
                            {formatDate({
                              dateString: roomingList.cut_off_date,
                              options: { day: 'numeric' },
                            })}
                          </div>
                        </div>
                        <span className="text-gray-500 text-xs">
                          Cut Off Date
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm mb-4">
                      <span className="mr-2">
                        <CalendarDays />
                      </span>{' '}
                      {formatDate({
                        dateString: roomingList.start_date,
                        options: { month: 'short', day: 'numeric' },
                      })}{' '}
                      -{' '}
                      {formatDate({
                        dateString: roomingList.end_date,
                      })}{' '}
                    </div>
                    <div className="flex flex-col items-center gap-1 lg:flex-row">
                      <Button
                        variant="primary"
                        className="text-sm font-semibold lg:text-base"
                        onClick={fetchBookingsByRoomingListId.bind(null, {
                          roomingListId: roomingList.rooming_list_id,
                        })}
                      >
                        View Bookings ({roomingList.bookings_count})
                      </Button>
                      <Tooltip
                        content="Show Agreement as PDF"
                        className="lg:w-auto"
                      >
                        <Button variant="secondary">
                          <File />
                        </Button>
                      </Tooltip>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

export default Dashboard;
