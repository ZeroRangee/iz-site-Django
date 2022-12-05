// import csrft from "/csrftoken"
// $(document).ready(() =>{
// 	csrft()
// })

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

				let photo = $(this).find('input[name="photo_after"]')

				for (var i = 0; i < photo[0].files.length; i++) {
					formData.append("file_" + i, photo[0].files[i]);
				}
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
							// var respons = JSON.parse(response.success);
							// console.log(respons)

							// $(".applicationBlock").html(respons)


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
							// var respons = JSON.parse(response.success);
							// console.log(respons)

							// $(".applicationBlock").html(respons)


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
				// if ('errors' in response){
				// 	$('.msg').text(response.errors['__all__']).removeClass('none')

				// 	$('.msg').each((index, ex) => {
				// 		$(el).remove()
				// 	}) 
				// }
				// console.log('ok -', response)
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

		let photo = $(this).find('input[name="photo"]')

		for (var i = 0; i < photo[0].files.length; i++) {
			formData.append("file_" + i, photo[0].files[i]);
		}

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
						console.log(i);
						$('.msg').text(response['errors'][i]).removeClass('none')

						$('.msg').each((index, ex) => {
							$(el).remove()
						})
						// console.log(i);
					}
				}
				else {
					// var respons = JSON.parse(response.success);
					// console.log(respons)

					// $(".applicationBlock").html(respons)


				}

			},
			error: function (data) {
				// console.log('err -',response)

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


// function getAppli() {
// 	let response = fetch('/accounts/profil/', {
// 		method: 'get',
// 		headers: {
// 			'X-Requested-With': 'XMLHttpRequest',
// 			'Content-Type': 'application/json'
// 		}
// 	})
// 	let data = response.json()
// 	console.log(data)
// 	// let content = document.getElementById('application')
// 	// content.innerHTML = data
// }