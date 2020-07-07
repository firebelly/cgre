import zenscroll from 'zenscroll';
import appState from '../util/appState';
import autosize from 'autosize';

const contact = {
  init() {
    // JavaScript to be fired on the contact page

    // Contact submit button changes text on hover
    let submitButton = document.querySelector('.contact-form-wrap button[type=submit]');
    let submitButtonSpan = submitButton.querySelector('span');
    submitButton.addEventListener('mouseover', e => {
      submitButtonSpan.textContent = 'Let’s Go';
    });
    submitButton.addEventListener('mouseout', e => {
      submitButtonSpan.textContent = 'Submit';
    });
    // Focus/blur support
    submitButton.addEventListener('focus', e => {
      submitButtonSpan.textContent = 'Let’s Go';
    });
    submitButton.addEventListener('blur', e => {
      submitButtonSpan.textContent = 'Submit';
    });

    // AJAXify contact form submission
    let $form = $('#contact-form');
    let formResponse = document.querySelector('.contact-form-wrap .form-response');
    let formWrap = document.querySelector('.contact-form-wrap .form-wrap');

    // Store initial thanks copy if replaced by error
    let thanksHtml = formResponse.innerHTML;

    $form.on('submit', (e) => {
      e.preventDefault();
      if (appState.requestInProgress) {
        return false;
      }
      let $subject = $form.find('input[name=subject]');
      let fromName = $form.find('input[name=fromName]').val();

      // Set dynamic subject line to avoid gmail making a conversation thread and hiding text
      $subject.val($subject.data('original-value') + ' from ' + fromName);

      // Set appState flag to avoid multiple submits
      appState.requestInProgress = true;

      // Submit form
      $.post({
        url: '/',
        dataType: 'json',
        data: $form.serialize(),
        success: (response) => {
          if (response.success) {
            formResponse.innerHTML = thanksHtml;
            formWrap.classList.add('-success');
            zenscroll.center(formResponse);
          } else {
            formResponse.innerHTML = response.error || '<p>There was an error, please try again.</p>';
            zenscroll.center(formResponse);
          }
        },
        error: (response) => {
          formResponse.innerHTML = response.error || '<p>There was an error, please try again.</p>';
          zenscroll.center(formResponse);
        }
      }).fail((response) => {
        formResponse.innerHTML = response.error || '<p>There was an error, please try again.</p>';
        zenscroll.center(formResponse);
      }).always(() => {
        formResponse.classList.add('-active');
        appState.requestInProgress = false;
      });
    });

  },

  finalize() {
    // JavaScript to be fired on the contact page, after the init JS
  },
};

export default contact
