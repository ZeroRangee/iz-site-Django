
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

function clearInput(form, firstInput, lastInput) {
	for (let i in form[0]) {
		if (Number(i) >= firstInput && Number(i) < lastInput) {
			$(form[0][i]).val('');
		}
		else if (Number(i) > lastInput + 1) {
			break
		}
	}
}
function countAgreed() {
	fetch('/countAgreed/')
		.then((response) => response.json())
		.then((data) => {
			console.log(data.data)
			$('#number').html('').text(data.data)
			$('.gridBlock').load(`/applicationAgreed/`)
		})
}
countAgreed()


// setInterval(countAgreed, 5000)
// function autoNext() {
// 	countAgreed()
// 	next();
// 	setTimeout(autoNext, 2000);
// }
// setTimeout(autoNext, 5000);






// let form = $('#ZayvkaForm')[0]
// console.log(form[1])
// for (let i in $('#ZayvkaForm')[0]) {
// 	numb = 0
// 	console.log(i)
// 	if (Number(i) > 0 && Number(i) < 5) {
// 		console.log($('#ZayvkaForm')[0][i])
// 		$($('#ZayvkaForm')[0][i]).val('');
// 	} else {

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
		$('.msg').addClass('none');
		$('input').removeClass('error');
		$(this).parents('.overlayZayvka').fadeOut();

		return false;
	});
	$(document).keydown(function (e) {
		if (e.keyCode === 27) {
			$('.msg').addClass('none');
			$('input').removeClass('error');
			e.stopPropagation();
			$('.overlayZayvka').fadeOut();

		}
	});
	$('.overlayZayvka').click(function (e) {
		if ($(e.target).closest('.modalZayvkaUp').length == 0) {
			$('.msg').addClass('none');
			$('input').removeClass('error');
			$(this).fadeOut();
			console.log($(this))
		}
	});
});

$(document).ready(function ($) {
	$('.closeZayvka').click(function () {
		$('.overlayApplicationDeleteModal').fadeIn();
		const urls = $(this).attr('href')
		console.log(urls)
		$(function ($) {
			$('#DeleteModal').submit(function (e) {
				e.preventDefault()
				$.ajax({
					type: this.method,
					url: urls,
					headers: { 'X-CSRFToken': getCookie('csrftoken') },
					success: function (response) {
						console.log(response)
						$('.overlayApplicationDeleteModal').fadeOut();
						$('#applicationBlock').load('/accounts/profil/application/')

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
		$('.msg').addClass('none');
		$('input').removeClass('error');
		$(this).parents('.overlayApplicationDeleteModal').fadeOut();
		return false;
	});
	$(document).keydown(function (e) {
		if (e.keyCode === 27) {
			$('.msg').addClass('none');
			$('input').removeClass('error');
			e.stopPropagation();
			$('.overlayApplicationDeleteModal').fadeOut();
		}
	});
	$('.overlayApplicationDeleteModal').click(function (e) {
		if ($(e.target).closest('.modalApplicationDelete').length == 0) {
			$('.msg').addClass('none');
			$('input').removeClass('error');
			$(this).fadeOut();
		}
	});
});

$(document).ready(function ($) {
	$(".Agreed").on('click', function (e) {
		$('#applicationBlock').load(`/accounts/profil/applicationAgreed/`)
	})
	$(".Created").on('click', function (e) {
		$('#applicationBlock').load(`/accounts/profil/applicationCreated/`)
	})

	$(".Rejected").on('click', function (e) {
		$('#applicationBlock').load(`/accounts/profil/applicationRejected/`)
	})
})


$(document).ready(function ($) {
	$('.updateAgreed').click(function () {
		$('.overlayApplicationUpdateAgreedModal').fadeIn();
		const urls = $(this).attr('href')
		console.log(urls)
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
						$('.overlayApplicationUpdateAgreedModal').fadeOut();
						$('#applicationBlock').load('/accounts/profil/application/')
						$('#sound')[0].play()




					}
				},
				error: function (data) {
					// console.log('err -',response)

				},

			}
			)
		})
		return false;
	});
	$('.closeZayvkaUp').click(function () {
		$('.msg').addClass('none');
		$('input').removeClass('error');
		$(this).parents('.overlayApplicationUpdateAgreedModal').fadeOut();
		return false;
	});
	$(document).keydown(function (e) {
		if (e.keyCode === 27) {
			$('.msg').addClass('none');
			$('input').removeClass('error');
			e.stopPropagation();
			$('.overlayApplicationUpdateAgreedModal').fadeOut();
		}
	});
	$('.overlayApplicationUpdateAgreedModal').click(function (e) {
		if ($(e.target).closest('.modalApplicationUpdateAgreed').length == 0) {
			$('.msg').addClass('none');
			$('input').removeClass('error');
			$(this).fadeOut();
		}
	});
});

$(document).ready(function ($) {
	$('.updateRejected').click(function () {
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
							$('.overlayApplicationUpdateRejectedModal').fadeOut();
							$('#applicationBlock').load('/accounts/profil/application/')


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
		$('.msg').addClass('none');
		$('input').removeClass('error');
		$(this).parents('.overlayApplicationUpdateRejectedModal').fadeOut();
		return false;
	});
	$(document).keydown(function (e) {
		if (e.keyCode === 27) {
			$('.msg').addClass('none');
			$('input').removeClass('error');
			e.stopPropagation();
			$('.overlayApplicationUpdateRejectedModal').fadeOut();
		}
	});
	$('.overlayApplicationUpdateRejectedModal').click(function (e) {
		if ($(e.target).closest('.modalApplicationUpdateRejected').length == 0) {
			$('.msg').addClass('none');
			$('input').removeClass('error');
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
		$('.msg').addClass('none');
		$('input').removeClass('error');
		$(this).parents('.overlayCategoryAddModal').fadeOut();
		return false;
	});
	$(document).keydown(function (e) {
		if (e.keyCode === 27) {
			$('.msg').addClass('none');
			$('input').removeClass('error');
			e.stopPropagation();
			$('.overlayCategoryAddModal').fadeOut();
		}
	});
	$('.overlayCategoryAddModal').click(function (e) {
		if ($(e.target).closest('.modalCategoryAdd').length == 0) {
			$('.msg').addClass('none');
			$('input').removeClass('error');
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
		$('.msg').addClass('none');
		$('input').removeClass('error');
		$(this).parents('.overlayCategoryDeleteModal').fadeOut();
		return false;
	});
	$(document).keydown(function (e) {
		if (e.keyCode === 27) {
			$('.msg').addClass('none');
			$('input').removeClass('error');
			e.stopPropagation();
			$('.overlayCategoryDeleteModal').fadeOut();
		}
	});
	$('.overlayCategoryDeleteModal').click(function (e) {
		if ($(e.target).closest('.modalCategoryDelete').length == 0) {
			$('.msg').addClass('none');
			$('input').removeClass('error');
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
					clearInput($('#SingUpForm'), 1, 6)
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
					$('.overlaySingUp').fadeOut();
					clearInput($('#SingUpForm'), 1, 3)
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
				if (response['errors']) {
					for (let i in response['errors']) {
						$('.msg').text(response['errors'][i]).removeClass('none')
						$('.msg').each((index, ex) => {
							$(el).remove()
						})
						// console.log(i);
					}
				}
				else {
					clearInput($('#ZayvkaForm'), 1, 5)
					$('.msg').addClass('none')

					$('.blockContent').load(`/accounts/profil/application/`)

					$('.overlayZayvka').fadeOut();


				}

			},
			error: function (data) {

			},

		})
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
					clearInput($('#CategoryAdd'), 1, 1)

					$('.overlayCategoryAddModal').fadeOut();
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
					clearInput($('#CategoryDelete'), 1, 1)
					$('.overlayCategoryDeleteModal').fadeOut();

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


