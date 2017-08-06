/**
 * Created by harshilkumar on 5/25/17.
 */



$(document).ready(function () {

    $(document).on("click", ".add_news_btn", function () {
        console.log($(this));
        var $copied_block = '<div class="each_nws_tab">' +
            '<div class="news_details">' +
            '<div class="news_heading">' +
            '<span class="lbl_edit lbl_wdth">Project Heading </span>' +
            '<span class="inputbox"><input type="text" class="maps_twtr ip_style" placeholder="Give me project heading"/></span>' +
            '</div>' +
            '<div class="">' +
            '<span class="lbl_edit lbl_wdth">Project Details </span>' +
            '<span class="inputbox inline_display"><textarea rows="3" class="text_news"></textarea></span>' +
            '</div>' +
            '</div>' +
            '<div class="Delete_btn">' +
            '<button class="delete_nws_btn">Delete This Project</button>' +
            '</div>' +
            '</div>';

        $($copied_block).insertBefore($(this));
    });

    //maps-interior.herokuapp.com

    $(document).on("click", ".Delete_btn", function () {
        console.log($(this));
        $(this).parent().remove();
    });

    var response_obj = {};
    response_obj["project_array"] = {};
    response_obj["News_array"] = {};

    $(document).on("click", "#submit_response", function () {
        console.log($(this));
        // get the aboutus response
        if ($("#aboutus_text").val()) {
            response_obj["aboutus"] = $("#aboutus_text").val();
        }
        else {
            response_obj["aboutus"] = "";
        }

        response_obj["maps_email"] = $("#maps_email").val();
        response_obj["maps_fb"] = $("#maps_fb_page").val();
        response_obj["maps_twtr"] = $("#maps_twtr_page").val();
        response_obj["maps_fax"] = $("#maps_fax").val();
        response_obj["maps_phone"] = $("#maps_phone").val();

        var counter_num = 0;
        var number_of_projects = $("#project_details_holder").find(".each_nws_tab").length;
        for (var k = 0; k < number_of_projects; k++) {
            var each_tab = $("#project_details_holder").find(".each_nws_tab")[k];
            console.log(each_tab);
        }

        $("#project_details_holder").find(".each_nws_tab").each(function () {
            console.log(counter_num);
            response_obj["project_array"]["Project_name_" + counter_num] = $(this).find("input").val();
            response_obj["project_array"]["Project_desc_" + counter_num] = $(this).find("textarea").val();
            console.log("Project object", response_obj);
            counter_num++;
        });
        var counter_num_news = 0;
        $("#news_details_holder").find(".news_details").each(function () {

            response_obj["News_array"]["News_name_" + counter_num_news] = $(this).find("input").val();
            response_obj["News_array"]["News_desc_" + counter_num_news] = $(this).find("textarea").val();
            console.log("News object", response_obj);

            counter_num_news++;
        });

        var d = new Date();

        var month = d.getMonth()+1;
        var day = d.getDate();

        var output = d.getFullYear() + '-' +
            ((''+month).length<2 ? '0' : '') + month + '-' +
            ((''+day).length<2 ? '0' : '') + day;
        //output = "Timestamp:"+output;

        saveNewMapsData(output, response_obj);
        function saveNewMapsData(maps_key, maps_obj) {
            var Dbdata = {"dataKey": maps_key, "MapasData": maps_obj};
            Dbdata = JSON.stringify(Dbdata);
            console.log(Dbdata);

            $.ajax({
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                url: 'https://maps-interior.herokuapp.com/storeNewSetofData',
                data: Dbdata,
                dataType: "json",
                crossDomain: true,
                complete: function () {
                    //called when complete
                    console.log('SAve new guest api campleed');
                },
                success: function (res) {
                    console.log(res);

                },
                error: function () {
                    // Data not found in json want to offer for new user.
                    console.log("Error while storing guest data");
                },
            });

        }

        console.log(response_obj);
    });
});