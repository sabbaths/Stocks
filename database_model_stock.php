<?php

class Database {

    private static $environment = 1; //1 for dev, 2 godaddy
    public static $connection;
    private static $servername = "";
    private static $username = "";
    private static $password = "";
    private static $database = "";

    function setEnvironment() {
        try {
            if(self::$environment == 1) { //dev
                static::$servername = "localhost";
                static::$username = "root"; //apgiaa godaddy.com
                self::$password = "root";
                self::$database = "stocks"; //apgiaa godaddy.com
            } else if (self::$environment == 2) { //godaddy
                self::$servername = "localhost";
                self::$username = "sabbaths"; //apgiaa godaddy.com
                self::$password = "Ac2am9jlqwxl)";
                self::$database = "scheduling"; //apgiaa 
            } else if (self::$environment == 3) { //epizy
                self::$servername = "http://185.27.134.10/";
                self::$username = "epiz_26302129"; //apgiaa godaddy.com
                self::$password = "MxWzDm0K2TM";
                //self::$password = "ac2am9jlqwxl0";
                self::$database = "epiz_26302129_stocks"; //apgiaa 
            } else if (self::$environment == 4) { //heroku
                self::$servername = "us-cdbr-east-02.cleardb.com";
                self::$username = "bcc35f095e072b"; 
                self::$password = "66fe0a01";
                self::$database = "heroku_a50ca651fcd79c1"; //apgiaa 
            }
        } catch(Exception $e) {

        }
    }
    
    function connectDB() {
        self::setEnvironment();
        $status_code = 900; //901 connected 900 failed

        // Create connection
        $conn = new mysqli(self::$servername, self::$username, self::$password);
        $conn->select_db(self::$database);
        self::$connection = $conn;
        // Check connection
        if ($conn->connect_error) {
            $status_code = 901;
            die("Connection failed: " . $conn->connect_error);
        }
        return $status_code;
    }

    function login($username, $password) {
        $status_code = 1002;
        $user_id = 0;
        $return_array = [];

        $sql = "SELECT user_id FROM users WHERE username = ? AND password = ? ";

        try {
            $stmt = self::$connection->prepare($sql);
            $stmt->bind_param('ss', $username, $password);
            $stmt->execute();
            $stmt -> store_result();
            $stmt -> bind_result($user_id);
            $stmt -> fetch();
            $status_code = 1001;
        } catch (Exception $exc) {
            $status_code = 1003;
        }

        $return_array = [$status_code, $user_id];
        return $return_array;
    }

    function getStocks($user_id = 1, $page_id = 1, $country_stocks = "PH") {
        $stocks_arr = array();
        $sql = "SELECT * 
            FROM stocks 
            WHERE user_id = $user_id
                AND page_id = $page_id
                AND is_active = 1
                AND stock_country = '$country_stocks'
            ORDER BY name, page_id DESC;";

        $result = self::$connection->query($sql);   

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $id = $row["id"];
                $name = $row["name"];
                $text = $row["text"];
                
                $temp_array = array($id, $name, $text);
                array_push($stocks_arr ,$temp_array);
            }  
        }
        //print_r($courses_arr);
        
        return $stocks_arr;       
    }

    function getStockInfo($stock_id) {
        $stocks_arr = array();
        $sql = "SELECT * FROM stock_info WHERE stock_id = $stock_id;";
        $result = self::$connection->query($sql);   

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $stock_info_id = $row["stock_info_id"];
                $stock_id = $row["stock_id"];
                $name = $row["name"];
                $text = $row["text"];
                $shares = $row["shares"];
                $entry = $row["entry"];
                $exit = $row["stock_exit"];
                $be = $row["be"];
                $p1 = $row["p1"];
                $p2 = $row["p2"];
                $p5 = $row["p5"];
                $p10 = $row["p10"];
                $alerted = $row["alerted"];
                $risk_entry = $row["risk_entry"];
                $risk_exit = $row["risk_exit"];
                $risk_capital = $row["risk_capital"];
                $risk_perc = $row["risk_perc"];
                $risk_position = $row["risk_position"];
                $risk_shares = $row["risk_shares"];
                
                $temp_array = array($stock_info_id, $stock_id, $name, $text, $shares, $entry, $exit, $be, $p1, $p2, $p5, $p10, $alert_price, $alerted,
                    $risk_entry,
                    $risk_exit,
                    $risk_capital,
                    $risk_perc,
                    $risk_position,
                    $risk_shares);
                array_push($stocks_arr ,$temp_array);
            }  
        }
        //print_r($courses_arr);
        
        return $stocks_arr; 
        //return $sql;      
    }

    function getStockInfoUS($stock_id) {
        $stocks_arr = array();
        $sql = "SELECT * FROM stock_info_us WHERE stock_id = $stock_id;";
        $result = self::$connection->query($sql);   

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $stock_info_id = $row["stock_info_id"];
                $stock_id = $row["stock_id"];
                $invested_amount = $row["invested_amount"];
                $units = $row["units"];
                $entry = $row["entry"];
                $exit = $row["exit"];
                $buy_sell = $row["pl"];
                $pl = $row["pl"];
                $risk_buy_sell = $row["risk_buy_sell"];
                $risk_port = $row["risk_port"];
                $risk_pct = $row["risk_pct"];
                $risk_entry = $row["risk_entry"];
                $risk_exit = $row["risk_exit"];
                $risk_buy_units = $row["risk_buy_units"];
                $risk_invest_amt = $row["risk_invest_amt"];
                $alert = $row["alert"];
                $text = $row["text"];
                
                $temp_array = array(
                    $stock_info_id, 
                    $stock_id, 
                    $invested_amount, 
                    $units, 
                    $entry,
                    $exit,
                    $buy_sell,
                    $buy_sell,
                    $pl,
                    $risk_buy_sell,
                    $risk_port,
                    $risk_pct,
                    $risk_entry,
                    $risk_exit,
                    $risk_buy_units,
                    $risk_invest_amt,
                    $alert,
                    $text);
                array_push($stocks_arr ,$temp_array);
            }  
        }
        //print_r($courses_arr);
        
        return $stocks_arr; 
        //return $sql;      
    }

    function addStock($id=1, $name, $text="", $page_id, $country_stock) {
        $sql_insert_student = "INSERT INTO stocks 
                (name, text, user_id, page_id, stock_country) 
                VALUES ( 
                '".strtoupper($name)."',
                '".strtoupper($text)."',
                '".$id."',
                '".$page_id."',
                '".$country_stock."')";

        $sql_check_duplicate = "
            SELECT * 
            FROM stocks 
            WHERE name = '$name'
                AND is_active = 1
                AND stock_country = '$country_stock'
                AND page_id = $page_id ";
     

        $result = self::$connection->query($sql_check_duplicate);

        if ($result->num_rows > 0) {
            return [7006,7007];  
        }

        if (self::$connection->query($sql_insert_student) === TRUE) {
            $stock_id = self::$connection->insert_id;
            self::addStockInfo($stock_id, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);

            return [7001, $stock_id];
        } else {   
            //echo self::$connection->error;
            return [7004, 7005]; //error
        }
    }

    function deleteStock($id) {
        $sql_update_stocks = "UPDATE  stocks SET is_active = 0 WHERE id = $id";
        $sql_delete_stock = "DELETE FROM stocks WHERE id = $id";
        $sql_delete_stock_info = "DELETE FROM stock_info WHERE stock_id = $id";
        self::$connection->query($sql_update_stocks);

        //OLD CODE delete stocks/stock info
        /*
        self::$connection->query($sql_delete_stock_info);

        if (self::$connection->query($sql_delete_stock) === TRUE) {
            return 7001; //good
        } else {   
            echo self::$connection->error;
            return 7002;
            //return $sql_insert_student; //error
        } */

        return 7001;
    }

    function addStockInfo3($stock_id, $bias, $shares,$entry,$exit,$be,$p1,$p2,$p5,$p10,$alert=0) {

        $sql_delete_stock_info = "DELETE FROM stock_info WHERE stock_id = $stock_id";
        $sql_insert_student = "INSERT INTO stock_info 
                (stock_id, name, text, shares, entry, stock_exit, be, p1, p2, p5,p10,alert) 
                VALUES ( 
                '".$stock_id."',
                '"."none"."',
                '".$bias."',
                '".$shares."',
                '".$entry."',
                '".$exit."',
                '".$be."',
                '".$p1."',
                '".$p2."',
                '".$p5."',
                '".$p10."',
                '".$alert."')";

        self::$connection->query($sql_delete_stock_info);

        if (self::$connection->query($sql_insert_student) === TRUE) {
            return 7001; //good
        } else {   
            echo self::$connection->error;
            return 7002;
        }
    }

    function computeStocks($shares = 1000, $entry = 33.6, $exit = 0, $first_loop=false) {
        $commission_charge = .0025;
        $sccp_charge = .0001;
        $vat_charge = .12;
        $pse_fee_charge = .00005;
        $sales_tax_charge = .006;

        $gross = $shares * $entry;
        $commission = $gross * $commission_charge;
        $vat = $commission * $vat_charge;
        $sccp = $gross * $sccp_charge;
        $pse_fee = $gross * $pse_fee_charge;
        $sales_tax = $gross * $sales_tax_charge;

        $total_charges_sell = $commission+$vat+$sccp+$pse_fee+$sales_tax;
        $total_charges_buy = $commission+$vat+$sccp+$pse_fee;
        $net_buy = $gross + $total_charges_buy;
        $net_sell = $gross - $total_charges_sell;
        

        /*
        get entry + .1
        loop 
        check returned percentage
        if not .1 .2 .5 .10 continue

        */
        $percentage = (($net_sell - $net_buy) / $gross) *100;
        if($first_loop==false) {
            for($new_entry=$entry+.1;$new_entry<=$entry*2;$new_entry=$new_entry+.01) {
                $new_net_sell = $this->computeStocks(1000,$new_entry,0, true)[2];
                
                $new_percentage = (($new_net_sell - $net_buy) / $gross);
                $new_percentage = round($new_percentage,3) * 100;
                if($new_percentage == 1 || $new_percentage == 5) {
                echo '<p>' . '' . $new_entry.' '.$gross. ' ' . $new_net_sell . ' ' . $new_percentage;
                }

            }  
        }

        

        return [$entry, $net_buy, $net_sell, $percentage];
    }

    function saveAlertPrice($stock_id, $alert_price) {
        $sql_alert_price = "UPDATE stock_info SET alert = $alert_price WHERE stock_id = $stock_id";


        if (self::$connection->query($sql_alert_price) === TRUE) {
            return 7001; //good
        } else {   
            echo self::$connection->error;
            return 7004; //error
        }
    }

    function getAlertPrice($stock_id) {
        $stocks_arr = array();
        $sql = "SELECT alert FROM stock_info WHERE stock_id = $stock_id;";
        $result = self::$connection->query($sql);   

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $id = $row["alert"];
                
                $temp_array = array($id);
                array_push($stocks_arr ,$temp_array);
            }  
        } else {
            $temp_array = array(0);
            array_push($stocks_arr ,$temp_array);
        }
        //print_r($courses_arr);
        
        return $stocks_arr;     
    }

    function getStockCurrentChangePrice($stock_id, $stock_name, $what_price) {
        $stocks_arr = array();
        $sql = "SELECT current_price FROM stock_info WHERE stock_id = $stock_id;";

        if($what_price != 0) {
            $sql = "SELECT change_perc FROM stock_info WHERE stock_id = $stock_id;";
        }


        $result = self::$connection->query($sql);   

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $id = 0;
                if($what_price == 0) {
                    $id = $row["current_price"];
                } else {
                    $id = $row["change_perc"];
                }
                
                $temp_array = array($id);
                array_push($stocks_arr ,$temp_array);
            }  
        } else {
            $temp_array = array(0);
            array_push($stocks_arr ,$temp_array);
        }
        //print_r($courses_arr);
        
        return $stocks_arr;     
    }

    function updateStockCurrentPrice($stock_id, $price = 0, $what_price = 0) {


        $sql_update_current_price = " UPDATE stock_info SET current_price = '$price' WHERE stock_id = $stock_id ";
        
        if($what_price != 0) {
            $sql_update_current_price = " UPDATE stock_info SET change_perc = '$price' WHERE stock_id = $stock_id ";
        } 
        echo $sql_update_current_price;
        
        if (self::$connection->query($sql_update_current_price) === TRUE) {
            return $sql_update_current_price; //good
        } else {   
            echo self::$connection->error;
            //return $sql_update_current_price; //error
        }

    }

    function addStockInfo($stock_id, $bias, $shares,$entry,$exit,$be,$p1,$p2,$p5,$p10,$alert, 
            $input_entry_position,
            $input_exit_position,
            $input_capital_position,
            $input_risk_perc_position,
            $input_risk_position,
            $input_buyshares_position) {

        $sql = "SELECT * FROM stock_info WHERE stock_id = $stock_id ";

        $sql_insert_student = "INSERT INTO stock_info 
                (stock_id, name, text, shares, entry, stock_exit, be, p1, p2, p5,p10,alert,
                    risk_entry,
                    risk_exit,
                    risk_capital,
                    risk_perc,
                    risk_position,
                    risk_shares) 
                VALUES ( 
                '".$stock_id."',
                '"."none"."',
                '".$bias."',
                '".$shares."',
                '".$entry."',
                '".$exit."',
                '".$be."',
                '".$p1."',
                '".$p2."',
                '".$p5."',
                '".$p10."',
                '".$alert."',
                '".$input_entry_position."',
                '".$input_exit_position."',
                '".$input_capital_position."',
                '".$input_risk_perc_position."',
                '".$input_risk_position."',
                '".$input_buyshares_position."')";
        $sql_update = "
                UPDATE stock_info
                SET name = 'none', 
                    text = '$bias',
                    shares = '$shares',
                    entry = '$entry',
                    stock_exit = '$exit',
                    be = '$be',
                    p1 = '$p1',
                    p2 = '$p2',
                    p5 = '$p5',
                    p10 = '$p10',
                    risk_entry = '$input_entry_position',
                    risk_exit = '$input_exit_position',
                    risk_capital = '$input_capital_position',
                    risk_perc = '$input_risk_perc_position',
                    risk_position = '$input_risk_position',
                    risk_shares = '$input_buyshares_position',
                    alert = '$alert'
                WHERE
                    stock_id = $stock_id ";

        $result = self::$connection->query($sql);   
        $insert = true;

        if ($result->num_rows > 0) { 
            $insert = false;
        }

        if($insert) {
            self::$connection->query($sql_insert_student);
            return 70011;
        } else {
            self::$connection->query($sql_update);
            return 80011;
        }
    }

    function addStockInfoUS(
        $stock_id,
        $buy_sell,
        $bias,
        $plcalc_input_units,
        $plcalc_input_entry2,
        $plcalc_input_exit,
        $plcalc_input_pl,
        $rd_btn_buy,
        $risk_input_port,
        $risk_input_risk,
        $risk_input_entry,
        $risk_input_exit,
        $risk_input_units,
        $risk_input_invest_amt,
        $alert = 0) {

        $sql = "SELECT * FROM stock_info_us WHERE stock_id = $stock_id ";

        $sql_insert_student = "INSERT INTO stock_info_us
                (stock_id, 
                invested_amount, 
                units, 
                entry, 
                stock_info_us.exit, 
                pl,
                buy_sell, 
                risk_buy_sell, 
                risk_port, 
                risk_pct,
                risk_entry,
                risk_exit,
                risk_buy_units,
                risk_invest_amt,
                text,
                alert) 
                VALUES ( 
                '".$stock_id."',
                '". 0 ."',
                '".$plcalc_input_units."',
                '".$plcalc_input_entry2."',
                '".$plcalc_input_exit."',
                '".$plcalc_input_pl."',
                '".$buy_sell."',
                '".$rd_btn_buy."',
                '".$risk_input_port."',
                '".$risk_input_risk."',
                '".$risk_input_entry."',
                '".$risk_input_exit."',
                '".$risk_input_units."',
                '".$risk_input_invest_amt."',
                '".$bias."',
                '" . 0 . "')";


        $sql_update = "
                UPDATE stock_info_us
                SET invested_amount = '0', 
                    units = '$plcalc_input_units',
                    entry = '$plcalc_input_entry2',
                    stock_info_us.exit = '$plcalc_input_exit',
                    pl = '$plcalc_input_pl',
                    buy_sell = '$buy_sell',
                    risk_buy_sell = '$rd_btn_buy',
                    risk_port = '$risk_input_port',
                    risk_pct = '$risk_input_risk',
                    risk_entry = '$risk_input_entry',
                    risk_exit = '$risk_input_exit',
                    risk_buy_units = '$risk_input_units',
                    risk_invest_amt = '$risk_input_invest_amt',
                    alert = '$alert',
                    text = '$bias'
                WHERE
                    stock_id = $stock_id ";

        echo $sql_update;

        $result = self::$connection->query($sql);   
        $insert = true;

        if ($result->num_rows > 0) { 
            $insert = false;
        }

        if($insert) {
            if(self::$connection->query($sql_insert_student) == TRUE) {
                return 1511;
            } else {
                return self::$connection->error; 
            }
        } else {
            if(self::$connection->query($sql_update) == TRUE) {
                return 1522;    
            } else {
                return 1533;
            }
            
        }
    }    
    
}
