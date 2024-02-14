import Session from '/assets/scripts/session';
import { ThrillMapAPI, getURLParams } from '../api';
import '/components/card';

function loadPage() {
  const params = getURLParams();
  if (!Session.isLoggedIn()) {
    window.location.href = '/login';
  }
  if (params.logout) {
    Session.logoutUser();
    window.location.href = '/';
  }
  const firstNameField = document.getElementById('profile-first-name') as HTMLInputElement;
  const lastNameField = document.getElementById('profile-last-name') as HTMLInputElement;
  const emailField = document.getElementById('profile-email') as HTMLInputElement;
  ThrillMapAPI.getProfile().then(profile => {
    firstNameField.value = profile.firstName;
    lastNameField.value = profile.lastName;
    emailField.value = profile.email;
  });
  const saveChangesButton = document.querySelector(
    '#profile-form > button'
  ) as HTMLButtonElement;
  saveChangesButton.addEventListener('click', () => {
      const firstNameField = document.getElementById('profile-first-name') as HTMLInputElement;
      const lastNameField = document.getElementById('profile-last-name') as HTMLInputElement;
      const emailField = document.getElementById('profile-email') as HTMLInputElement;
      const form = {
        firstName: firstNameField.value,
        lastName: lastNameField.value,
        email: emailField.value
      };
      ThrillMapAPI.updateProfile(form).then(() => {
        window.location.href = '/account/profile.html';
      });
    }
  );
}

loadPage();
