import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { createNotificationData, Notification } from "../store/types";
import notificationService from "../service/notificationService";

interface NotificationsState {
  isLoading: boolean;
  error: string | null;
  dataLoaded: boolean;
  notifications: Notification[];
}

const initialState: NotificationsState = {
  isLoading: false,
  error: null,
  dataLoaded: false,
  notifications: [],
};

export const NotificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    notificationsRequested: (state: NotificationsState) => {
      state.isLoading = true;
    },
    notificationsReceived: (
      state: NotificationsState,
      action: PayloadAction<Notification[]>
    ) => {
      state.dataLoaded = true;
      state.notifications = action.payload;
      state.isLoading = false;
    },
    notificationsRead: (
      state: NotificationsState,
      action: PayloadAction<string[]>
    ) => {
      action.payload.forEach((r) => {
        const index = state.notifications.findIndex((n) => n._id === r);
        state.notifications[index].isRead = true;
      });

      state.isLoading = false;
    },
    notificationReceived: (
      state: NotificationsState,
      action: PayloadAction<Notification>
    ) => {
      state.notifications.unshift(action.payload);
    },
    notificationsRemoved: (
      state: NotificationsState,
      action: PayloadAction<string[]>
    ) => {
      const notifications = state.notifications.filter(
        (n) => !action.payload.includes(n._id)
      );
      state.notifications = notifications;
    },

    notificationsCreateFailed: (
      state: NotificationsState,
      action: PayloadAction<string>
    ) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    notificationsRequestFailed: (
      state: NotificationsState,
      action: PayloadAction<string>
    ) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const createNotification =
  (notification: createNotificationData) => async (dispatch: Dispatch) => {
    try {
      return await notificationService.createNotification(notification);
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(notificationsCreateFailed(message));
    }
  };

export const removeNotifications =
  (ids: string[]) => async (dispatch: Dispatch) => {
    try {
      const deletetNot = await notificationService.removeNotifications(ids);
      dispatch(notificationsRemoved(ids));
      return deletetNot;
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(notificationsRequestFailed(message));
    }
  };
export const loadNotifications =
  (userId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(notificationsRequested());
      const data = await notificationService.getNotifications(userId);
      dispatch(notificationsReceived(data));
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(notificationsRequestFailed(message));
    }
  };
export const changeNotsToRead =
  (notsIds: string[]) => async (dispatch: Dispatch) => {
    try {
      dispatch(notificationsRequested());
      await notificationService.readNotifications(notsIds);
      dispatch(notificationsRead(notsIds));
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(notificationsRequestFailed(message));
    }
  };
export const getUnreadIds =
  () =>
  (state: { notification: NotificationsState }): string[] => {
    const ids: string[] = [];
    state.notification.notifications.forEach((n) => {
      if (!n.isRead) {
        ids.push(n._id);
      }
    });
    return ids;
  };

export const notficationsCount =
  () =>
  (state: { notification: NotificationsState }): number =>
    state.notification.notifications.reduce((count, notification) => {
      if (!notification.isRead) {
        return count + 1;
      }
      return count;
    }, 0);

export const getNotificationsLoading =
  () =>
  (state: { notifications: NotificationsState }): boolean =>
    state.notifications.isLoading;
export const findNotification =
  (type: string, typeId: string, author: string) =>
  (state: { notifications: NotificationsState }): boolean =>
    state.notifications.isLoading;
export const getAllNotifications =
  () => (state: { notification: NotificationsState }) =>
    state.notification.notifications;
const { reducer: notificationsReducer, actions } = NotificationsSlice;
const {
  notificationsRequested,
  notificationsReceived,
  notificationsCreateFailed,
  notificationsRequestFailed,
  notificationsRead,
  notificationsRemoved,
} = actions;

export default notificationsReducer;
