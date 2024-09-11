// import { reactive } from "vue";
// import { darkTheme, lightTheme , useThemeVars} from "naive-ui";

// /*
//  * @Date: 2022-03-23 11:00:26
//  * @LastEditTime: 2022-05-21 14:08:28
//  */

// let local = reactive({
//   theme: null,
//   pageAnim: "scale",
//   osTheme: "light",
// });


// const themeOverrides = {
//   common: {
//     fontWeightStrong: "600",
//     successColor: "#52C41A",
//     successColorHover: "#73D13D",
//     successColorPressed: "#389E0D",
//     successColorSuppl: "rgba(82, 196, 26, 0.5)",

//     infoColor: "#1865D9",
//     infoColorHover: "#3E87E6",
//     infoColorPressed: "#0B48B3",
//     infoColorSuppl: "rgba(24, 101, 217, 0.5)",

//     warningColor: "#FAAD14",
//     warningColorHover: "#FFC53D",
//     warningColorPressed: "#D48806",
//     warningColorSuppl: "rgba(250, 173, 20, 0.5)",

//     errorColor: "#F5222D",
//     errorColorHover: "#FF4D4F",
//     errorColorPressed: "#CF1322",
//     errorColorSuppl: "rgba(208, 48, 80, 0.5)",
//   },
//   Divider: {
//      color: "#333333"
//   },
//   Input: {
//     heightMedium:"38px"
//   },
//   Button: {
//    heightMedium: "38px"
//   },
//   Space: {
//     gapSmall: '4px 8px',
//     gapMedium: '20px 12px', //默认 padding 
//     gapLarge: '12px 16px'
//   }
// };


// function swtichTheme() {
//   if (local.osTheme === 'dark') {
//     local.theme = lightTheme;
//     local.osTheme = 'light'
//     localStorage.defipay_admin_theme = 'light'
//   } else {
//     local.theme = darkTheme;
//     local.osTheme = 'dark'
//     localStorage.defipay_admin_theme = 'dark'
//   }
// // console.log("当前操作系统的主题是" + local.osTheme, useThemeVars());
// }


// function initTheme() {
//   if (localStorage.defipay_admin_theme === 'dark') {
//     local.theme = darkTheme;
//     local.osTheme = 'dark'
//   }
  
// }



// export function useTheme() {
//   return {
//     themeOverrides,
//     swtichTheme,
//     initTheme,
//     local
//   };
// }
