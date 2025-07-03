import { isEmpty } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { getFilteredRoomingLists } from '../services/rooming-list.js';
import useAuth from './useAuth';

export default function useRoomingListsHook({
  search,
  status,
  sortBy,
  sortOrder,
}) {
  const { isLoading } = useAuth();
  const [roomingLists, setRoomingLists] = useState([]);
  const [events, setEvents] = useState([]);
  const [roomingListGroupByEvent, setRoomingListGroupByEvent] = useState({});

  const getRoomingListGroupByEvent = ({ roomingLists }) => {
    const grouped = roomingLists.reduce((acc, roomingList) => {
      const eventName = roomingList.event_name || 'Other';
      if (!acc[eventName]) {
        acc[eventName] = [];
      }
      acc[eventName].push(roomingList);
      return acc;
    }, {});

    const orderedKeys = Object.keys(grouped).sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: 'base' })
    );

    const orderedGrouped = {};
    orderedKeys.forEach((key) => {
      orderedGrouped[key] = grouped[key];
    });

    return orderedGrouped;
  };

  const refetch = useCallback(() => {
    if (isLoading) return;

    getFilteredRoomingLists({
      search,
      status,
      sortBy,
      sortOrder,
    })
      .then((data) => {
        setRoomingLists(data);
      })
      .catch((error) => {
        console.error('Error fetching rooming lists:', error);
      });
  }, [isLoading, search, status, sortBy, sortOrder]);

  useEffect(() => {
    if (isEmpty(roomingLists)) {
      setEvents([]);
      setRoomingListGroupByEvent({});
      return;
    }

    const grouped = getRoomingListGroupByEvent({ roomingLists });
    setEvents(Object.keys(grouped));
    setRoomingListGroupByEvent(grouped);
  }, [roomingLists]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    events,
    roomingListGroupByEvent,
    refetch,
  };
}
