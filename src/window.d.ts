/*
 * @Date: 2022-03-16 20:23:42
 * @LastEditTime: 2022-11-24 16:56:58
 */

import type {
    LoadingBarProviderInst,
    DialogProviderInst,
    MessageProviderInst,
    NotificationProviderInst
  } from 'naive-ui';
  declare global {
    interface Window {
      $loadingBar?: LoadingBarProviderInst;
      $dialog?: DialogProviderInst;
      $message?: MessageProviderInst;
      $notification?: NotificationProviderInst;
      $permissionIds: string[];
      $haveAuth: Functions;
    }
  }