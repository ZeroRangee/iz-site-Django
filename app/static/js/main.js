
function changestyle() {
	var stick = document.getElementById("stick")
	if (stick.style.visibility == 'visible') {
		stick.style.visibility = 'hidden';
		setTimeout(changestyle, 400);
	} else {
		stick.style.visibility = 'visible';
		setTimeout(changestyle, 700);
	}
}
setTimeout(changestyle, 0);



$(document).ready(function ($) {
	$('#BtnSingUP').click(function () {
		$('.overlaySingUp').fadeIn();
		return false;
	});
	$('.closeSingUp').click(function () {
		$(this).parents('.overlaySingUp').fadeOut();
		$('.msg').addClass('none');
		$('input').removeClass('error');
		return false;
	});
	$(document).keydown(function (e) {
		if (e.keyCode === 27) {
			e.stopPropagation();
			$('.overlaySingUp').fadeOut();
		}
	});
	$('.overlaySingUp').click(function (e) {
		if ($(e.target).closest('.modalSingUp').length == 0) {
			$(this).fadeOut();
			$('.msg').addClass('none');
			$('input').removeClass('error');
		}
	});
});

$(document).ready(function ($) {
	$('#BtnSingIn').click(function () {
		$('.overlaySingIn').fadeIn();
		return false;
	});
	$('.closeSingIn').click(function () {
		$(this).parents('.overlaySingIn').fadeOut();
		$('.msg').addClass('none');
		$('input').removeClass('error');
		return false;
	});
	$(document).keydown(function (e) {
		if (e.keyCode === 27) {
			e.stopPropagation();
			$('.overlaySingIn').fadeOut();
		}
	});
	$('.overlaySingIn').click(function (e) {
		if ($(e.target).closest('.modalSingIn').length == 0) {
			$('.msg').addClass('none');
			$('input').removeClass('error');
			$(this).fadeOut();

		}
	});
});

$(document).ready(function ($) {
	$('.BTN-zayvka').click(function () {
		$('.overlayZayvka').fadeIn();
		return false;
	});
	$('.closeZayvkaUp').click(function () {
		$(this).parents('.overlayZayvka').fadeOut();
		return false;
	});
	$(document).keydown(function (e) {
		if (e.keyCode === 27) {
			e.stopPropagation();
			$('.overlayZayvka').fadeOut();
		}
	});
	$('.overlayZayvka').click(function (e) {
		if ($(e.target).closest('.modalZayvkaUp').length == 0) {
			$(this).fadeOut();
		}
	});
});

$(document).ready(function ($) {
	$('.closeZayvka').click(function () {
		$('.overlayApplicationDeleteModal').fadeIn();
		// console.log('asdasd')
		// const url = "/accounts/profil/deleteApplication/" + $(this).attr('href') + "/"
		const urls = $(this).attr('href')


		$(function ($) {
			$('#DeleteModal').submit(function (e) {
				e.preventDefault()
				$.ajax({
					type: this.method,
					url: urls,
					headers: { 'X-CSRFToken': getCookie('csrftoken') },
					success: function (response) {
						console.log(response)
					},
					error: function (data) {
						// console.log('err -',response)

					},

				}
				)
			})
		})
		return false;
	});
	$('.close').click(function () {
		$(this).parents('.overlayApplicationDeleteModal').fadeOut();
		return false;
	});
	$(document).keydown(function (e) {
		if (e.keyCode === 27) {
			e.stopPropagation();
			$('.overlayApplicationDeleteModal').fadeOut();
		}
	});
	$('.overlayApplicationDeleteModal').click(function (e) {
		if ($(e.target).closest('.modalApplicationDelete').length == 0) {
			$(this).fadeOut();
		}
	});
});

$(document).ready(function ($) {
	$('#updateAgreed').click(function () {
		$('.overlayApplicationUpdateAgreedModal').fadeIn();
		const urls = $(this).attr('href')
		console.log(urls)

		$(function ($) {
			$('#UpdateAgreed').submit(function (e) {
				let formData = new FormData(UpdateAgreed)

				console.log(formData)
				e.preventDefault()
				$.ajax({
					type: this.method,
					url: urls,
					contentType: false,
					processData: false,
					data: formData,
					dataType: 'json',
					headers: { 'X-CSRFToken': getCookie('csrftoken') },
					success: function (response) {
						if (response['errors']) {
							for (let i in response['errors']) {
								console.log(i);
								$('.msg').text(response['errors'][i]).removeClass('none')

								$('.msg').each((index, ex) => {
									$(el).remove()
								})
								// console.log(i);
							}
						}
						else {

						}
					},
					error: function (data) {
						// console.log('err -',response)

					},

				}
				)
			})
		})
		return false;
	});
	$('.closeZayvkaUp').click(function () {
		$(this).parents('.overlayApplicationUpdateAgreedModal').fadeOut();
		return false;
	});
	$(document).keydown(function (e) {
		if (e.keyCode === 27) {
			e.stopPropagation();
			$('.overlayApplicationUpdateAgreedModal').fadeOut();
		}
	});
	$('.overlayApplicationUpdateAgreedModal').click(function (e) {
		if ($(e.target).closest('.modalApplicationUpdateAgreed').length == 0) {
			$(this).fadeOut();
		}
	});
});

$(document).ready(function ($) {
	$('#updateRejected').click(function () {
		$('.overlayApplicationUpdateRejectedModal').fadeIn();
		const urls = $(this).attr('href')
		$(function ($) {
			$('#UpdateRejected').submit(function (e) {
				e.preventDefault()
				$.ajax({
					type: this.method,
					url: urls,
					data: $(this).serialize(),
					dataType: 'json',
					headers: { 'X-CSRFToken': getCookie('csrftoken') },
					success: function (response) {
						if (response['errors']) {
							for (let i in response['errors']) {
								console.log(i);
								$('.msg').text(response['errors'][i]).removeClass('none')

								$('.msg').each((index, ex) => {
									$(el).remove()
								})
								// console.log(i);
							}
						}
						else {

						}
					},
					error: function (data) {


					},

				}
				)
			})
		})
		return false;
	});
	$('.close').click(function () {
		$(this).parents('.overlayApplicationUpdateRejectedModal').fadeOut();
		return false;
	});
	$(document).keydown(function (e) {
		if (e.keyCode === 27) {
			e.stopPropagation();
			$('.overlayApplicationUpdateRejectedModal').fadeOut();
		}
	});
	$('.overlayApplicationUpdateRejectedModal').click(function (e) {
		if ($(e.target).closest('.modalApplicationUpdateRejected').length == 0) {
			$(this).fadeOut();
		}
	});
});


$(document).ready(function ($) {
	$('.categoryAdd').click(function () {
		$('.overlayCategoryAddModal').fadeIn();
		return false;
	});
	$('.closeZayvkaUp').click(function () {
		$(this).parents('.overlayCategoryAddModal').fadeOut();
		return false;
	});
	$(document).keydown(function (e) {
		if (e.keyCode === 27) {
			e.stopPropagation();
			$('.overlayCategoryAddModal').fadeOut();
		}
	});
	$('.overlayCategoryAddModal').click(function (e) {
		if ($(e.target).closest('.modalCategoryAdd').length == 0) {
			$(this).fadeOut();
		}
	});
});

$(document).ready(function ($) {
	$('.categoryDelete').click(function () {
		$('.overlayCategoryDeleteModal').fadeIn();
		return false;
	});
	$('.closeZayvkaUp').click(function () {
		$(this).parents('.overlayCategoryDeleteModal').fadeOut();
		return false;
	});
	$(document).keydown(function (e) {
		if (e.keyCode === 27) {
			e.stopPropagation();
			$('.overlayCategoryDeleteModal').fadeOut();
		}
	});
	$('.overlayCategoryDeleteModal').click(function (e) {
		if ($(e.target).closest('.modalCategoryDelete').length == 0) {
			$(this).fadeOut();
		}
	});
});




$(function ($) {
	$('#SingInForm').submit(function (e) {
		e.preventDefault()
		$.ajax({
			type: this.method,
			url: this.action,
			data: $(this).serialize(),
			dataType: 'json',
			headers: { 'X-CSRFToken': getCookie('csrftoken') },
			success: function (response) {
				console.log(response.errors)
				if (response.errors) {
					for (let i in response.errors) {
						console.log(i);
						$('.msg').text(response.errors[i]).removeClass('none')

						$('.msg').each((index, ex) => {
							$(el).remove()
						})
						// console.log(i);
					}

				}
				else {
					document.location.href = './accounts/profil';
				}

			}

		}
		)
	})
})
$(function ($) {
	$('#SingUpForm').submit(function (e) {
		e.preventDefault()
		$.ajax({
			type: this.method,
			url: this.action,
			data: $(this).serialize(),
			dataType: 'json',
			headers: { 'X-CSRFToken': getCookie('csrftoken') },
			success: function (response) {
				console.log(response.errors)
				if (response.errors) {
					for (let i in response.errors) {
						console.log(i);
						$('.msg').text(response.errors[i]).removeClass('none')

						$('.msg').each((index, ex) => {
							$(el).remove()
						})
						// console.log(i);
					}

				}
				else {
					// window.location.reload()
				}

			},
			error: function (response) {
				// console.log('err -',response)

			}

		}
		)
	})
})
$(function ($) {
	$('#ZayvkaForm').submit(function (e) {
		e.preventDefault()


		let formData = new FormData(ZayvkaForm)

		$.ajax({
			type: this.method,
			url: this.action,
			contentType: false,
			processData: false,
			data: formData,
			dataType: 'json',
			headers: { 'X-CSRFToken': getCookie('csrftoken') },
			success: function (response) {
				console.log(response.success['photo'])
				if (response['errors']) {
					for (let i in response['errors']) {
						console.log(i);
						$('.msg').text(response['errors'][i]).removeClass('none')

						$('.msg').each((index, ex) => {
							$(el).remove()
						})
						// console.log(i);
					}
				}
				else {
					$('#applicationBlock').load(`/accounts/profil/application/`)


				}

			},
			error: function (data) {

			},

		})
		return false
	})
})
$(function ($) {
	$('#CategoryAdd').submit(function (e) {
		e.preventDefault()
		$.ajax({
			type: this.method,

			url: this.action,
			data: $(this).serialize(),
			dataType: 'json',
			headers: { 'X-CSRFToken': getCookie('csrftoken') },
			success: function (response) {
				// var error = response.errors.length
				console.log(response.errors)
				if (response.errors) {
					for (let i in response.errors) {
						console.log(i);
						$('.msg').text(response.errors[i]).removeClass('none')

						$('.msg').each((index, ex) => {
							$(el).remove()
						})
						// console.log(i);
					}

				}
				else {
					// window.location.reload()
				}

			},
			error: function (response) {
			}

		}
		)
	})
})



$(function ($) {
	$('#CategoryDelete').submit(function (e) {
		e.preventDefault()
		urls = '/accounts/profil/categoryDelete/' + document.getElementById('id_categoryDelete').value + '/'
		console.log(urls)
		$.ajax({
			type: this.method,
			url: urls,
			dataType: 'json',
			headers: { 'X-CSRFToken': getCookie('csrftoken') },
			success: function (response) {

				if (response.errors) {
					for (let i in response.errors) {
						console.log(i);
						$('.msg').text(response.errors[i]).removeClass('none')

						$('.msg').each((index, ex) => {
							$(el).remove()
						})
						// console.log(i);
					}

				}
				else {
					// window.location.reload()
				}



			},
			error: function (data) {
				// console.log('err -',response)

			},

		}
		)
	})
})


// $('.imgZayvka').on('mouseout', function (e) {
// 	$('.imgZayvkar').css('display', 'none')
// 	$('.photo_after').css('display', 'block')
// })

$(".Agreed").on('click', function (e) {
	$('#applicationBlock').load(`/accounts/profil/applicationAgreed/`)
})
$(".Created").on('click', function (e) {
	$('#applicationBlock').load(`/accounts/profil/applicationCreated/`)
})

$(".Rejected").on('click', function (e) {
	$('#applicationBlock').load(`/accounts/profil/applicationRejected/`)
})
$(function () {
	$('.dropdownUl li ').hover(
		function () {
			$('dropdownUl li', this).slideDown(500)
		},
		function () {
			$('dropdownUl li ', this).slideUp(500)

		}
	)
})