const iconPaths = {
  back: 'M5.97887 12.476C5.97887 12.2459 6.07484 12.0637 6.28597 11.8431L10.7197 7.41273C10.8637 7.2593 11.0556 7.18258 11.2955 7.18258C11.7466 7.18258 12.0825 7.52781 12.0825 7.97851C12.0825 8.20867 11.9769 8.41004 11.833 8.56347L10 10.3855L8.44528 11.7472L10.9213 11.6513H18.2245C18.7044 11.6513 19.0499 11.9869 19.0499 12.4856C19.0499 12.9555 18.7044 13.3007 18.2245 13.3007H10.9213L8.44528 13.2144L10 14.5762L11.833 16.3886C11.9866 16.542 12.0825 16.7434 12.0825 16.9736C12.0825 17.4242 11.7466 17.7791 11.2955 17.7791C11.0556 17.7791 10.8637 17.6928 10.7197 17.5393L6.28597 13.1185C6.08445 12.9075 5.97887 12.7254 5.97887 12.476Z',
  close:
    'm.35,24.81c.48.46,1.25.46,1.72,0l10.43-10.51,10.44,10.51c.46.46,1.25.47,1.71,0,.47-.49.47-1.26,0-1.72l-10.43-10.51L24.64,2.07c.47-.46.48-1.24,0-1.72-.47-.46-1.25-.46-1.71,0l-10.44,10.51L2.07.35C1.6-.11.82-.12.35.35-.11.84-.11,1.61.35,2.07l10.44,10.51L.35,23.09c-.46.46-.47,1.24,0,1.72Z',
  check:
    'M11.1232 18.5221C10.7585 18.5221 10.4802 18.3685 10.2018 18.0135L6.92926 14.0595C6.76612 13.8484 6.67015 13.6085 6.67015 13.3685C6.67015 12.8887 7.04443 12.4952 7.52427 12.4952C7.82177 12.4952 8.06169 12.6008 8.32082 12.9367L11.0847 16.3916L16.6317 7.57202C16.8236 7.25531 17.1019 7.08257 17.3899 7.08257C17.8506 7.08257 18.2729 7.40887 18.2729 7.89831C18.2729 8.12863 18.1481 8.37815 18.0232 8.57969L12.006 18.0135C11.7853 18.3494 11.4878 18.5221 11.1232 18.5221Z',
  down: 'M7.22867 10.5621C6.92157 10.8594 6.92157 11.3772 7.26705 11.7225L12.411 17.131C13.0924 17.8502 13.8697 17.8502 14.5608 17.131L19.7046 11.7225C20.0405 11.3772 20.0501 10.8594 19.743 10.5621C19.4072 10.2169 18.8697 10.2169 18.5626 10.5526L13.4858 15.8748L8.40909 10.5526C8.09239 10.2169 7.56456 10.2169 7.22867 10.5621Z',
  download:
    'M13.4376 6.08937C13.9267 6.08937 14.2623 6.42501 14.2623 6.91408V13.8569L14.176 16.3502L15.5377 14.7871L17.2254 13.0801C17.3884 12.9171 17.5803 12.8404 17.8104 12.8404C18.2707 12.8404 18.6159 13.1761 18.6159 13.6268C18.6159 13.8569 18.5392 14.0487 18.3858 14.1925L14.0801 18.4983C13.8691 18.6997 13.6869 18.8051 13.4376 18.8051C13.2074 18.8051 13.0252 18.7092 12.8142 18.4983L8.49895 14.1925C8.34552 14.0487 8.27839 13.8569 8.27839 13.6268C8.27839 13.1761 8.61403 12.8404 9.07433 12.8404C9.30447 12.8404 9.50586 12.9268 9.65929 13.0801L11.3567 14.7871L12.6992 16.3311L12.6129 13.8569V6.91408C12.6129 6.42501 12.9581 6.08937 13.4376 6.08937Z',
  edit: 'M9.26263 17.98L7.57357 18.6705C7.34324 18.7569 7.07453 18.5267 7.18969 18.2486L7.92866 16.6279L16.4891 8.07405L17.8423 9.43577L9.26263 17.98ZM18.5429 8.73572L17.1897 7.38359L18.0438 6.53972C18.4277 6.16572 18.85 6.12736 19.205 6.47259L19.4354 6.71233C19.8001 7.06714 19.7905 7.49867 19.3873 7.89184L18.5429 8.73572Z',
  locked:
    'M7.91162 17.5584V12.4567C7.91162 11.5266 8.30479 11.0855 9.09114 11.0471V9.47441C9.09114 7.19209 10.472 5.66734 12.505 5.66734C14.538 5.66734 15.9189 7.19209 15.9189 9.47441V11.0471C16.7053 11.0855 17.0984 11.5266 17.0984 12.4567V17.5584C17.0984 18.527 16.6669 18.9681 15.775 18.9681H9.23498C8.34315 18.9681 7.91162 18.527 7.91162 17.5584ZM10.2802 11.0375H14.7394V9.34974C14.7394 7.83459 13.838 6.8181 12.505 6.8181C11.172 6.8181 10.2802 7.83459 10.2802 9.34974V11.0375Z',
  play: 'M11.0789 17.453C10.5323 17.7886 9.8898 17.5105 9.8898 16.9448V8.05523C9.8898 7.48944 10.5707 7.24971 11.0789 7.55657L18.319 11.8623C18.8081 12.1596 18.8273 12.8596 18.319 13.1568L11.0789 17.453Z',
  next: 'M9.76558 19.0918C10.0684 19.4043 10.5957 19.4043 10.9473 19.0528L16.4551 13.8183C17.1875 13.125 17.1875 12.334 16.4551 11.6308L10.9473 6.39655C10.5957 6.05475 10.0684 6.04494 9.76558 6.35744C9.41408 6.69924 9.41408 7.24615 9.75588 7.55865L15.1758 12.7246L9.75588 17.8907C9.41408 18.2129 9.41408 18.75 9.76558 19.0918Z',
  replay:
    'M18.0763 13.0992C18.0763 16.235 15.583 18.7378 12.4856 18.7378C9.37859 18.7378 6.90448 16.235 6.90448 13.1376C6.90448 12.7252 7.2593 12.38 7.66206 12.38C8.09359 12.38 8.43881 12.7252 8.43881 13.1376C8.43881 15.4007 10.232 17.2131 12.4856 17.2131C14.7487 17.2131 16.542 15.4007 16.542 13.1376C16.542 10.884 14.7487 9.08118 12.4856 9.08118C12.2267 9.08118 11.9774 9.10036 11.7856 9.13871L13.2528 10.6059C13.3966 10.7498 13.4733 10.932 13.4733 11.1334C13.4733 11.5265 13.1665 11.8429 12.7637 11.8429C12.5815 11.8429 12.3897 11.7471 12.2746 11.632L9.75258 9.09076C9.47449 8.81267 9.48407 8.31402 9.75258 8.02633L12.2459 5.49468C12.3801 5.34125 12.5719 5.24536 12.7637 5.24536C13.1761 5.24536 13.483 5.56181 13.483 5.96457C13.483 6.15636 13.4062 6.34815 13.2816 6.4824L12.1404 7.64274C12.2938 7.62356 12.4952 7.60438 12.6774 7.60438C15.5542 7.60438 18.0763 10.021 18.0763 13.0992Z',
  share:
    'M7.05115 17.9802C6.7251 17.9802 6.40864 17.7021 6.40864 17.1652C6.40864 11.9292 8.73891 8.95651 13.5241 8.95651H13.7542V6.23308C13.7542 5.82072 14.0515 5.4755 14.4831 5.4755C14.7995 5.4755 15.0009 5.60976 15.3173 5.89744L20.7738 10.9895C21.0615 11.258 21.1382 11.4978 21.1382 11.7279C21.1382 11.958 21.0615 12.1978 20.7738 12.4663L15.3173 17.5872C15.0296 17.846 14.7899 17.9802 14.4734 17.9802C14.0515 17.9802 13.7542 17.6639 13.7542 17.2515V14.528H13.5241C10.7048 14.528 8.96907 15.2568 7.81831 17.5008C7.60735 17.9036 7.33884 17.9802 7.05115 17.9802Z',
  plus: 'M7.52587 12.5048C7.52587 11.9486 7.90974 11.5746 8.46636 11.5746H12.5258V7.50862C12.5258 6.97161 12.9002 6.57844 13.428 6.57844C13.975 6.57844 14.3493 6.96202 14.3493 7.50862V11.5746H18.428C18.9653 11.5746 19.3493 11.9486 19.3493 12.5048C19.3493 13.0322 18.9558 13.3966 18.428 13.3966H14.3493V17.4722C14.3493 18.0092 13.975 18.3928 13.428 18.3928C12.9002 18.3928 12.5258 17.9996 12.5258 17.4722V13.3966H8.46636C7.91934 13.3966 7.52587 13.0322 7.52587 12.5048Z',
  up: 'M6.24759 15.4105C5.94049 15.1131 5.94049 14.5953 6.28597 14.2501L11.43 8.84158C12.1113 8.12235 12.8886 8.12235 13.5797 8.84158L18.7235 14.2501C19.0594 14.5953 19.0691 15.1131 18.762 15.4105C18.4261 15.7556 17.8886 15.7556 17.5815 15.42L12.5048 10.0978L7.42801 15.42C7.11131 15.7556 6.58348 15.7556 6.24759 15.4105Z',
  facebook:
    'M26 13.5C26 6.62499 20.15 1 13 1C5.85001 1 0 6.62499 0 13.5C0 19.7499 4.71251 24.9062 10.8875 25.8437V17.0937H7.63751V13.5H10.8875V10.6875C10.8875 7.56249 12.8375 5.84375 15.7625 5.84375C17.225 5.84375 18.6875 6.15624 18.6875 6.15624V9.28124H17.0625C15.4375 9.28124 14.95 10.2187 14.95 11.1562V13.5H18.525L17.875 17.0937H14.7875V26C21.2876 25.0625 26 19.7499 26 13.5Z',
  linkedin:
    'M3.60001 16H0.199997V5.3H3.60001V16ZM1.9 3.8C0.800002 3.8 0 3 0 1.9C0 0.8 0.900002 0 1.9 0C3 0 3.8 0.8 3.8 1.9C3.8 3 3 3.8 1.9 3.8ZM16 16H12.6V10.2C12.6 8.5 11.9 8 10.9 8C9.89999 8 8.89999 8.8 8.89999 10.3V16H5.5V5.3H8.7V6.8C9 6.1 10.2 5 11.9 5C13.8 5 15.8 6.1 15.8 9.4V16H16Z',
  twitter:
    'M28.5 0H7.5C3.3585 0 0 3.3585 0 7.5V28.5C0 32.6415 3.3585 36 7.5 36H28.5C32.643 36 36 32.6415 36 28.5V7.5C36 3.3585 32.643 0 28.5 0ZM28.2915 13.8555C28.605 20.781 23.4405 28.503 14.2965 28.503C11.5155 28.503 8.928 27.6885 6.7485 26.2905C9.3615 26.598 11.9685 25.8735 14.0385 24.252C11.883 24.2115 10.065 22.788 9.4395 20.832C10.212 20.979 10.971 20.9355 11.6625 20.748C9.294 20.2725 7.6605 18.1395 7.713 15.858C8.376 16.227 9.1365 16.449 9.942 16.4745C7.7505 15.009 7.1295 12.114 8.418 9.9C10.8465 12.879 14.475 14.8395 18.567 15.045C17.8485 11.9655 20.187 9 23.3655 9C24.78 9 26.061 9.597 26.958 10.5555C28.08 10.335 29.1345 9.9255 30.087 9.3615C29.718 10.512 28.938 11.4765 27.9225 12.0855C28.9185 11.9655 29.868 11.7015 30.75 11.31C30.0915 12.294 29.256 13.161 28.2915 13.8555Z',
  instagram:
    'M18 3.2445C22.806 3.2445 23.376 3.2625 25.275 3.3495C30.153 3.5715 32.4315 5.886 32.6535 10.728C32.7405 12.6255 32.757 13.1955 32.757 18.0015C32.757 22.809 32.739 23.3775 32.6535 25.275C32.43 30.1125 30.1575 32.4315 25.275 32.6535C23.376 32.7405 22.809 32.7585 18 32.7585C13.194 32.7585 12.624 32.7405 10.7265 32.6535C5.8365 32.43 3.57 30.105 3.348 25.2735C3.261 23.376 3.243 22.8075 3.243 18C3.243 13.194 3.2625 12.6255 3.348 10.7265C3.5715 5.886 5.844 3.57 10.7265 3.348C12.6255 3.2625 13.194 3.2445 18 3.2445ZM18 0C13.1115 0 12.4995 0.021 10.5795 0.108C4.0425 0.408 0.4095 4.035 0.1095 10.578C0.021 12.4995 0 13.1115 0 18C0 22.8885 0.021 23.502 0.108 25.422C0.408 31.959 4.035 35.592 10.578 35.892C12.4995 35.979 13.1115 36 18 36C22.8885 36 23.502 35.979 25.422 35.892C31.953 35.592 35.595 31.965 35.8905 25.422C35.979 23.502 36 22.8885 36 18C36 13.1115 35.979 12.4995 35.892 10.5795C35.598 4.0485 31.9665 0.4095 25.4235 0.1095C23.502 0.021 22.8885 0 18 0V0ZM18 8.757C12.8955 8.757 8.757 12.8955 8.757 18C8.757 23.1045 12.8955 27.2445 18 27.2445C23.1045 27.2445 27.243 23.106 27.243 18C27.243 12.8955 23.1045 8.757 18 8.757ZM18 24C14.6865 24 12 21.315 12 18C12 14.6865 14.6865 12 18 12C21.3135 12 24 14.6865 24 18C24 21.315 21.3135 24 18 24ZM27.609 6.2325C26.415 6.2325 25.4475 7.2 25.4475 8.3925C25.4475 9.585 26.415 10.5525 27.609 10.5525C28.8015 10.5525 29.7675 9.585 29.7675 8.3925C29.7675 7.2 28.8015 6.2325 27.609 6.2325Z',
  copy: 'm12.48,0C5.65,0,0,5.66,0,12.49s5.66,12.49,12.49,12.49,12.49-5.66,12.49-12.49S19.31,0,12.48,0Zm2.66,6.16l2.46,2.53c.17.17.28.3.3.45h-2.89c-.23,0-.32-.09-.32-.32v-2.97c.14.03.28.14.45.31Zm.22,11.51c0,1.1-.54,1.65-1.62,1.65h-5.13c-1.08,0-1.62-.55-1.62-1.65v-7.68c0-1.09.55-1.65,1.62-1.65h2.03v3.92c0,.66.32.98.97.98h3.75v4.43Zm-4.05-5.42v-3.75c.19.05.37.2.58.41l2.99,3.07c.21.21.33.39.38.58h-3.64c-.2,0-.31-.1-.31-.31Zm6.68,2.74c0,1.1-.54,1.65-1.62,1.65h-.34v-3.4c.01-.7-.21-1.26-.67-1.73l-3-3.07c-.51-.53-1.05-.77-1.85-.77h-.9v-.39c0-1.05.55-1.62,1.62-1.62h2.83v3.25c0,.54.31.86.86.86h3.07v5.22Z',
  folder:
    'M 0 19.175781 C 0 21.367188 1.128906 22.488281 3.347656 22.488281 L 21.910156 22.488281 C 23.882812 22.488281 25 21.359375 25 19.175781 L 25 9.957031 L 0 9.957031 Z M 0 8.691406 L 25 8.691406 L 25 7.753906 C 25 5.558594 23.871094 4.441406 21.652344 4.441406 L 10.9375 4.441406 C 10.128906 4.441406 9.691406 4.269531 9.113281 3.769531 L 8.460938 3.21875 C 7.726562 2.582031 7.203125 2.390625 6.09375 2.390625 L 2.933594 2.390625 C 1.050781 2.390625 0 3.433594 0 5.542969 Z M 0 8.691406',
  star: 'm4.78,24.24c.41.32.93.22,1.56-.25l6.14-4.61,6.13,4.61c.63.47,1.15.57,1.57.25.41-.32.5-.84.25-1.6l-2.41-7.39,6.18-4.55c.63-.46.87-.94.71-1.45-.16-.5-.63-.75-1.41-.74l-7.59.05-2.31-7.42c-.25-.76-.61-1.14-1.12-1.14s-.88.38-1.12,1.14l-2.32,7.42-7.59-.05c-.78,0-1.24.24-1.4.74-.17.51.08.98.71,1.45l6.18,4.55-2.41,7.39c-.25.76-.15,1.28.26,1.6Z',
  book: 'm6.22,0C3.8,0,1.27,1.09.13,3c-.12.21-.13.34-.13.71v15.45c0,.44.28.72.75.72.25,0,.46-.09.65-.25,1.36-1.22,3.26-1.82,5.16-1.82s3.42.69,4.52,1.63c.12.1.26.15.38.15.23,0,.42-.17.42-.44V3.04c0-.28-.03-.35-.22-.62-1.14-1.54-3.2-2.42-5.43-2.42Zm12.57,0c-2.24,0-4.3.88-5.44,2.42-.19.27-.21.33-.21.62v16.11c0,.27.18.44.41.44.12,0,.26-.05.38-.15,1.1-.94,2.69-1.63,4.52-1.63s3.8.61,5.17,1.82c.18.16.39.25.64.25.47,0,.75-.28.75-.72V3.71c0-.37,0-.51-.13-.71-1.14-1.91-3.67-3-6.08-3Z',
  brain:
    'm5.25,15.52c2.41,0,3.82-1.62,3.82-3.65,0-.68-.28-1.44-.7-1.85-.37-.35-.59-.46-.59-.87,0-.35.26-.59.65-.59.28,0,.46.08.76.34.33.28.59.68.78,1.13,1.51-.35,2.12-1.3,2.12-2.83,0-.37.3-.68.67-.68s.68.31.68.68c0,2.13-.97,3.58-3.07,4.12.02.19.03.38.03.58,0,1.78-.78,3.22-2.12,4.1.97.7,2.25,1.07,3.58,1.07.26,0,.56-.02,1.1-.05-.11-.46-.17-.91-.17-1.34,0-5.68,7.91-4.88,7.91-10.41,0-2.24-2.1-3.79-4.24-3.79-.24,0-.55.04-.86.12-.73-1.01-1.96-1.6-3.14-1.6-2.07,0-3.47,1.38-3.55,3.3-.02.43-.3.68-.66.68-.39,0-.68-.29-.67-.74.04-.73.2-1.4.48-1.98-.48-.15-.97-.22-1.45-.22-2.34,0-4,1.52-4,3.3,0,1.24.9,2.3,2.32,2.3.37,0,.68.31.68.68s-.31.68-.68.68c-1.7,0-2.91-.82-3.44-2.04-.94,1.05-1.49,2.49-1.49,3.95,0,3.26,2.1,5.62,5.25,5.62Zm15.33,5.79c2.3,0,3.44-2.86,3.44-5.9,0-.45-.02-.88-.03-1.27-.82.42-1.83.63-2.98.57-.37-.02-.67-.3-.67-.68s.3-.71.67-.68c2.4.15,4-1.23,4-3.42,0-1.99-1.1-3.58-2.85-4.32-.99,6.32-7.95,5.43-8.11,9.84-.05,1.46,1.04,2.6,2.66,2.6.55,0,.81-.02,1.06-.02.21,1.72,1.22,3.26,2.82,3.26Z',
  clock:
    'm5.85,13.76c-.42,0-.74-.33-.74-.75s.32-.74.74-.74h5.89v-7.82c0-.41.34-.74.74-.74s.75.33.75.74v8.56c0,.42-.33.75-.75.75h-6.63Zm6.64,11.24c6.84,0,12.5-5.66,12.5-12.5S19.33,0,12.49,0,0,5.66,0,12.5s5.66,12.5,12.5,12.5Z',
}

export default iconPaths
