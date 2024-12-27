function(instance, context) {

    instance.data.status = 'ready';

    instance.data.run = function (rgs) {


        function makeid(length) {
            let result = '';
            let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }


        try {


            if (!rgs) {

                throw new Error('Empty: rgs.')
            }

            let rgs_id = rgs.split(',');


            function removeEmpty(arr) {

                if (Array.isArray(arr)) {

                    let ar = [];

                    for (let i = 0; i < arr.length; i++) {

                        if (typeof arr[i] === 'string') {

                            if (arr[i].trim() !== '') {

                                ar.push(arr[i].trim())
                            }
                        }
                    }

                    return ar
                }
            }

            rgs_id = removeEmpty(rgs_id);


            function check(id) {

                return (!!$(`#${id}`)[0])
            }

            function scale(ids, value) {

                let id = makeid(5);

                if (Array.isArray(instance.data.style_ids)) {

                    instance.data.style_ids.push(id)
                } else {

                    instance.data.style_ids = [id]
                }

                let style = `<style id=${id}>`;


                ids.forEach(id => {
                    style += ` ${id}, ${id} .group-item {
                        transform: scaleY(${value}) !important;
                        -webkit-transform: scaleY(${value}) !important;
                        -moz-transform: scaleY(${value}) !important;
                        -o-transform: scaleY(${value}) !important;
                        -ms-transform: scaleY(${value}) !important;
                        }
                        `
                });

                style += '</style>';



                instance.canvas.append(style)
            }

            function scrollDirectionRevers(arr) {

                for (let i = 0; i < arr.length; i++) {

                    $(function () {
                        $(arr[i]).mousewheel(function (event, delta) {

                            this.scrollTop += (delta * 30);
                            event.preventDefault()
                        })
                    })
                }
            }

            function apply(arr = [], scale_value, is_rg) {

                let arr_ids = [];
                let rgs_scroll = [];


                for (let i = 0; i < arr.length; i++) {

                    let cell = arr[i].trim();

                    arr_ids.push(`#${cell}`);

                    if (is_rg === true) {

                        let valid = check(cell);

                        if (valid) {

                            rgs_scroll.push(`#${cell}`)
                        }
                    }
                }

                instance.data.arr_ids = arr_ids;

                scale(arr_ids, scale_value);


                if (rgs_scroll.length > 0) {

                    scrollDirectionRevers(rgs_scroll)
                }
            }

            apply(rgs_id, -1, true);

            return {
                rgs: rgs_id
            }
        } catch (e) {

            instance.publishState('error', e.message)
        }
    }
}