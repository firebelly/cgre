import zenscroll from 'zenscroll';
import appState from '../util/appState';
import autosize from 'autosize';

const contact = {
  init() {
    // JavaScript to be fired on the contact page

    // Contact submit button changes text on hover
    document.querySelector('.contact-form-wrap button[type=submit]').addEventListener('mouseover', e => {
      e.target.textContent = 'Let’s Go';
    });
    document.querySelector('.contact-form-wrap button[type=submit]').addEventListener('focus', e => {
      e.target.textContent = 'Let’s Go';
    });
    document.querySelector('.contact-form-wrap button[type=submit]').addEventListener('mouseout', e => {
      e.target.textContent = 'Submit';
    });
    document.querySelector('.contact-form-wrap button[type=submit]').addEventListener('blur', e => {
      e.target.textContent = 'Submit';
    });

    // Contact message autoexpands
    let contactText = document.querySelector('#contact-form textarea');
    if (contactText) {
      autosize(contactText);
    }

    // AJAXify contact form submission
    let form = $('#contact-form');
    let formResponse = document.querySelector('.contact-form-wrap .form-response');
    let formWrap = document.querySelector('.contact-form-wrap .form-wrap');
    form.submit(function(e) {
      e.preventDefault();
      $.ajax({
        url: form.attr('action'),
        type: form.attr('method'),
        dataType: 'html',
        data: form.serialize(),
        success: (result) => {
          console.log(result);
          formResponse.innerHTML = result;
          if (result.match('success')) {
            formWrap.classList.add('-success');
          }
          zenscroll.center(formResponse);
        },
        error: (result) => {
          formResponse.innerHTML = '<p>There was an error, please try again.</p>';
          zenscroll.center(formResponse);
        }
      });
    });
  },

  finalize() {
    // JavaScript to be fired on the contact page, after the init JS
  },
};

export default contact
