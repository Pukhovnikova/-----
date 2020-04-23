
        function basket()
        {
            let sum = calculate();
            if (sum > 0)
            {
                let newWindow = window.open('form.html', 'form');
            }
        }

        function calculate()
        {
            let sum  = 0,
                size = 6;          
            localStorage.clear(); 
            for (let i = 1; i <= size; i++)
            {
                let price = 0,
                    count = 0;
                if (document.getElementById("count"+i).value != 0)
                {
                    count = parseInt(document.getElementById("count"+i).value);
                    price = parseInt(document.getElementById("price"+i).value);
                    let name = document.getElementById("productName"+i).innerHTML;
                    var object = {
                        name: name,
                        price: price,
                        count: count,
                    } 
                    localStorage.setItem(name, JSON.stringify(object));
                }
                sum += price * count;
            }
            return sum;
        }


        function order()
        {
            let form   = document.forms.contactform;
            // ФИО
            if (form.fio.value.length <
             3) {
                alert('Корректно заполните поле "ФИО"');
                return false;
            }
            if (form.fio.value.length == null)
            {
                alert('Поле "ФИО" пусто');
            }
            // Номер телефона
            if (form.phone.value == null) {
                alert('Поле "Номер телефона" пусто');
                return false;
            }
            if (form.phone.value.length < 10) {
                alert('Поле "Номер телефона" должно содержать минимум десять символов');
                return false;
            }
            if (!(/^[0-9-+()s]+z/.test(form.phone.value+"z"))) {
                alert('"Номер телефона" указан неверно');
                return false;
            }
            //почта
            if (form.email.value == null) {
                alert('Поле "Электронная почта" пусто');
                return false;
            }

            if (form.email.value.length < 6) {
                alert('Слишком короткий адрес электронной почты');
                return false;
            }

            if (!(/^\w+[-_\.]*\w+@\w+-?\w+\.[a-z]{2,4}$/.test(form.email.value)) ) {
                alert("Введите корректный адрес электронной почты");
                return false;
            }
            subject_mail = 'Новый заказ с сайта';
            let mailto_link = ` mailto:  ${form.email_to.value}
                                ?subject=${subject_mail}
                                &body=
                                ФИО:     ${form.fio.value}%0A
                                Регион:  ${form.region.value}%0A
                                Адрес:   ${form.address.value}%0A
                                Телефон: ${form.phone.value}%0A
                                E-mail:  ${form.email.value}`;
            window.open(mailto_link, '_blank');
        }

        function display()
        {
            let size = 6,
                sum = 0,
                s='';
            let keys = Object.keys(localStorage);
            for(let key of keys)
            {
                let item = JSON.parse(localStorage.getItem(key));
                allprice = item.price * item.count;
                s += `Название: ${item.name}, цена: ${item.price} руб., количество: ${item.count}. Всего за позицию: ${allprice} руб.\n`;
                sum += allprice;
            }
            s += `Общая сумма: ${sum} руб.`;
            document.getElementById('list').value=s;
        }